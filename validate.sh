#!/usr/bin/env bash

# Copyright 2024 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

set -e

echo "Validating inputs"

ACCOUNT_ID="$1"
APP_ID="$2"
BINARY_PATH="$3"
SERVICE_ACCOUNT_BASE64="$4"


if [[ -z "${BINARY_PATH}" ]]; then
  echo "::error::Error: 'binary_path' is a required input."
  exit 1
fi

if [[ ! -f "${BINARY_PATH}" ]]; then
  echo "::error::Error: 'binary_path' is not a valid file."
  exit 1
fi

if [[ -z "${ACCOUNT_ID}" ]]; then
  echo "::error::Error: 'account_id' is a required input."
  exit 1
fi

if [[ -z "${APP_ID}" ]]; then
  echo "::error::Error: 'app_id' is a required input."
  exit 1
fi

if [[ -z "${SERVICE_ACCOUNT_BASE64}" ]]; then
  echo "::error::Error: 'service_account_base64' is a required input."
  exit 1
fi
