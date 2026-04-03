#!/bin/bash
# Deploy to Amplify from S3 source: mz-website-v3/release-v3/
# Usage: ./scripts/deploy-amplify.sh

set -e

APP_ID="d7nh2r5on2w9e"
BRANCH="main"
REGION="ap-southeast-1"
S3_SOURCE="s3://mz-website-v3/release-v3"
TMP_DIR=$(mktemp -d)
ZIP_FILE="${TMP_DIR}/deploy.zip"

echo "==> Downloading from S3: ${S3_SOURCE}"
aws s3 sync "${S3_SOURCE}" "${TMP_DIR}/site/" --quiet

echo "==> Zipping site contents"
cd "${TMP_DIR}/site"
zip -r "${ZIP_FILE}" . -x "*.DS_Store" > /dev/null
cd - > /dev/null

echo "==> Creating Amplify deployment"
DEPLOY_RESULT=$(aws amplify create-deployment \
  --app-id "${APP_ID}" \
  --branch-name "${BRANCH}" \
  --region "${REGION}" \
  --output json)

JOB_ID=$(echo "${DEPLOY_RESULT}" | python3 -c "import sys,json; print(json.load(sys.stdin)['jobId'])")
UPLOAD_URL=$(echo "${DEPLOY_RESULT}" | python3 -c "import sys,json; print(json.load(sys.stdin)['zipUploadUrl'])")

echo "==> Uploading to Amplify (Job: ${JOB_ID})"
curl -s -T "${ZIP_FILE}" "${UPLOAD_URL}" > /dev/null

echo "==> Starting deployment"
aws amplify start-deployment \
  --app-id "${APP_ID}" \
  --branch-name "${BRANCH}" \
  --job-id "${JOB_ID}" \
  --region "${REGION}" > /dev/null

echo "==> Waiting for deployment..."
sleep 10

STATUS=$(aws amplify get-job \
  --app-id "${APP_ID}" \
  --branch-name "${BRANCH}" \
  --job-id "${JOB_ID}" \
  --region "${REGION}" \
  --query 'job.summary.status' \
  --output text)

echo "==> Deployment status: ${STATUS}"
echo "==> URL: https://main.${APP_ID}.amplifyapp.com"

# Cleanup
rm -rf "${TMP_DIR}"
