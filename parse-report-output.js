#!/usr/bin/env node

// Copyright 2024 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const fs = require("fs");

if (process.argv.length < 3) {
  console.log(
    `Usage: ${process.argv[0]} ${process.argv[1]} <path-to-report> [severity-threshold] [fail-on]`
  );
  console.log(
    `\tpath-to-report: JSON file containing the report from Google Checks`
  );
  console.log(
    `\tseverity-threshold: PRIORITY | POTENTIAL | OPPORTUNITY. [Default: PRIORITY]`
  );
  console.log(`\tfail-on: all|<unset> [Default: <unset>]`);
  process.exit(1);
}

const pathToReport = process.argv[2];
const severityThreshold = process.argv[3] || "PRIORITY";
if (!["PRIORITY", "POTENTIAL", "OPPORTUNITY"].includes(severityThreshold)) {
  console.error(
    `Invalid severity threshold: ${severityThreshold}. Valid values: PRIORITY | POTENTIAL | OPPORTUNITY`
  );
  process.exit(1);
}

const failOn = process.argv[4];

if (!fs.existsSync(pathToReport)) {
  console.error(`File ${pathToReport} does not exist`);
  process.exit(1);
}

const json = fs.readFileSync(pathToReport, "utf8");
const report = JSON.parse(json);

if (report.name !== undefined) {
  console.log(`Generated report name: ${report.name}`);
}
if (report.resultsUri !== undefined) {
  console.log(`Report console URL: ${report.resultsUri}`);
}

function failForSeverityThresholds(thresholds) {
  return thresholds.includes(severityThreshold);
}

const isFailingForSeverity = {
  PRIORITY: failForSeverityThresholds(["OPPORTUNITY", "POTENTIAL", "PRIORITY"]),
  // if check.severity is POTENTIAL, we want to fail when threshold is: OPPORTUNITY and POTENTIAL
  POTENTIAL: failForSeverityThresholds(["OPPORTUNITY", "POTENTIAL"]),
  OPPORTUNITY: failForSeverityThresholds(["OPPORTUNITY"]),
};

const failingChecks = [];
for (const check of report.checks) {
  if (
    isFailingForSeverity[check.severity.toString()] &&
    check.state.toString() === "FAILED"
  ) {
    failingChecks.push(check);
  }
}

if (failingChecks.length > 0) {
  console.log(`${failingChecks.length} failing issue(s) detected:`);
  for (const check of failingChecks) {
    console.log(`Type: ${check.type}. Details: ${JSON.stringify(check)}`);
  }
  if (failOn === "all") {
    process.exit(1);
  } else {
    process.exit(0);
  }
} else {
  console.log("No failing issues detected");
  process.exit(0);
}
