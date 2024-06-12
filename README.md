# Scan your mobile app with Google Checks
This GitHub Action scans your mobile app using Google Checks to uncover compliance issues and data collection/sharing behaviors.

Checks is a compliance platform from Google for mobile app developers that simplifies the path to privacy for development teams and the apps they’re building. Learn more at [checks.google.com](https://checks.google.com/).

## Requirements

To configure Checks to run in a pipeline, ensure you've fully onboarded and have retrieved key configuration inputs from
your Checks account and Google Cloud project.

### Create a Checks account and connect your app

Follow the [Quickstart](https://developers.google.com/checks/guide/getting-started/quickstart) documentation to create a Checks account and connect your first app.

### Target Checks account and app

When you run Checks in your CI/CD platform, you will need to assign the results
to a Checks account and an app that you've connected to that Checks account. To
do this, you'll need the Checks **Account ID** and **App ID**.

For your **Account ID**, visit your [Account Settings
page](https://checks.google.com/console/settings/account).

For your **App ID**, visit your [App Settings
page](https://checks.google.com/console/settings/apps).

### Authentication

A **service account** should be used when using Checks in an automation setup,
such as CI/CD. For more information on how to create and configure a service
account, see [Authenticate the
CLI](/checks/guide/cli/install-checks-cli#authenticate-service).

It is recommended to use CI environment variables to configure your JSON key.
For example:

```shell
CHECKS_CREDENTIALS=/my/path/to/serviceaccount.json
```

## Getting started

Actions live in the `.github/workflows/` directory within your repository. Start
by creating a `checks.yml` file in the workflows directory.

We recommend the following config in `.github/workflows/checks.yml` to run
Checks App Compliance analysis:

```yaml
name: Example workflow using Checks
on:
  release:
    types: [published]
jobs:
  checks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@4
      - name: Run Checks App Compliance analysis async
        uses: google-checks/checks-app-scan-github-action@latest
        with:
          account_id: "1234567890"
          app_id: "1234590"
          binary_path: "./example-app.apk"
          wait_for_report: true
        env:
          CHECKS_CREDENTIALS: ${{ secrets.SERVICE_ACCOUNT_JSON }}
```

This will run the App Compliance analysis when stable and pre-releases publish
and display the report results and URL in the workflow run logs (without failing
the build).

## Configuration

Just as with our CLI, you can configure the GitHub Action to meet the needs of
your process. Set custom inputs using the `with` key.

### Inputs

|          Name          |  Type   | Required |                                                                                                                                                                                                     Description                                                                                                                                                                                                      |
| :--------------------: | :-----: | :------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|       account_id       | string  |   Yes    |                                                                                                                                                          Checks account ID from [Checks settings page](https://checks.google.com/console/settings)                                                                                                                                                           |
|         app_id         | string  |   Yes    |                                                                                                                                                                                                Checks application ID                                                                                                                                                                                                 |
|      binary_path       | string  |   Yes    |                                                                                                                                                                                 Path to the application archive: .apk, .aab or .ipa                                                                                                                                                                                  |
|    version     | string |   No     |                                                                                                                                    Default to `latest`. Checks CLI version to use. It should be in the format `vX.Y.Z` or be set to `latest` to always fetch the latest CLI version.                                                                                                                                     |
| service_account_base64 | string  |   Yes    | base 64 encoded content of your service account. Refer to [Authenticate Checks with a service account](https://developers.google.com/checks/guide/integrate/cli/install-checks-cli#authenticate-cli) to generate a service account and to [storing Base64 binary blobs as secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#storing-base64-binary-blobs-as-secrets) |
|    generate_report     | boolean |   No     |                                                                                                                                    Default to `true`. If false the action won't upload the binary_path to checks. It is useful to test your authentication and other paramaters.                                                                                                                                     |
|    wait_for_report     | boolean |   No   |                                                                                                                                                            If `false`, the action won't wait for the report completion and the pipeline will keep going.                                                                                                                                                             |
|   severity_threshold   | string  |    No     |                                                                                                                                                                                With this option, only vulnerabilities of the specified level or higher are reported. Valid values are: `PRIORITY` `POTENTIAL` `OPPORTUNITY`                                                                                                                                                                                |
|        fail_on         | string  |    No     |                                                                                                                                          If `ALL`, then action will fail if there are any failed checks following `severity_threshold` condition. It won't fail by default.                                                                                                                                          |

### Outputs

The action will write to a `checks_results.json` file.

## Example of using Checks App Compliance Scan GitHub Action

By configuring the inputs to the Checks GitHub Action, you can customize if
the Checks analysis should run in the background or as part of your testing
suite.

### Configure Checks to run an analysis in the background on each commit, but not fail the build

```yaml
name: Example workflow using Checks
on: [push]
jobs:
  checks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@4
      - name: Run Checks App Compliance analysis async
        uses: google-checks/checks-app-scan-github-action@latest
        with:
          account_id: "1234567890"
          app_id: "1234590"
          binary_path: "./example-app.apk"
          service_account_base64: ${{ secrets.SERVICE_ACCOUNT_JSON }}
```

### Configure Checks to fail a release if the analysis finds priority issues

```yaml
name: Example workflow using Checks
on:
  release:
    types: [published]
jobs:
  checks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@4
      - name: Run Checks App Compliance analysis and fail on issues
        uses: google-checks/checks-app-scan-github-action@latest
        with:
          account_id: "1234567890"
          app_id: "1234590"
          binary_path: "./example-app.apk"
          wait_for_report: true
          severity_threshold: PRIORITY
          fail_on: true
          service_account_base64: ${{ secrets.SERVICE_ACCOUNT_JSON }}
```
