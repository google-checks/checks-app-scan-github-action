## Usage

### Inputs

|          Name          |  Type   | Required |                                                                                                                                                                                                         Description                                                                                                                                                                                                         |
| :--------------------: | :-----: | :------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|       account_id       | string  |   Yes    |                                                                                                                                                       Google Checks account ID from [Google Checks settings page](https://checks.area120.google.com/console/settings)                                                                                                                                                       |
|         app_id         | string  |   Yes    |                                                                                                                                                                                                Google Checks application id                                                                                                                                                                                                 |
|      binary_path       | string  |   Yes    |                                                                                                                                                                                     path to the application archive: .apk, .aab or .ipa                                                                                                                                                                                     |
| service_account_base64 | string  |   Yes    | base 64 encoded content of your service account. Please refer to [Authenticate Google Checks with a service account](https://developers.google.com/checks/guide/integrate/cli/install-checks-cli#authenticate-cli) to generate a service account and to [storing Base64 binary blobs as secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#storing-base64-binary-blobs-as-secrets) |
|    generate_report     | boolean |  False   |                                                                                                                                        Default to `true`. If false the action won't upload the binary_path to checks. It is useful to test your authentication and other paramaters.                                                                                                                                        |
|    wait_for_report     | boolean |   true   |                                                                                                                                                                If `false`, the action won't wait for the report completion and the pipeline will keep going.                                                                                                                                                                |
|   severity_threshold   | string  |    –     |                                                                                                                                                                                   Valid values are: `PRIORITY` `POTENTIAL` `OPPORTUNITY`                                                                                                                                                                                    |
|        fail_on         | string  |    –     |                                                                                                                                             If `ALL`, then action will fail if there are any failed checks following `severity_threshold` condition. It won't fail by default.                                                                                                                                              |

Example:

```yaml
- uses: comediadesign/upload-to-checks-action@latest
  with:
    account_id: "1234567890"
    app_id: "1234590"
    binary_path: "./example-app.apk"
    service_account_base64: ${{ secrets.CHECKS_SERVICE_ACCOUNT_B64 }}
    generate_report: true
```
