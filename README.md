## Usage

### Inputs

|          Name          |  Type   | Required |                                                                                                                                                                                                         Description                                                                                                                                                                                                         |
| :--------------------: | :-----: | :------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|       account_id       | string  |   Yes    |                                                                                                                                                       Google Checks account id from [Google Checks settings page](https://checks.area120.google.com/console/settings)                                                                                                                                                       |
|         app_id         | string  |   Yes    |                                                                                                                                                                                                Google Checks application id                                                                                                                                                                                                 |
|      binary_path       | string  |   Yes    |                                                                                                                                                                                     path to the application archive: .apk, .aab or .ipa                                                                                                                                                                                     |
| service_account_base64 | string  |   Yes    | base 64 encoded content of your service account. Please refer to [Authenticate Google Checks with a service account](https://developers.google.com/checks/guide/integrate/cli/install-checks-cli#authenticate-cli) to generate a service account and to [storing Base64 binary blobs as secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#storing-base64-binary-blobs-as-secrets) |
|    generate_report     | boolean |  False   |                                                                                                                                        Default to `true`. If false the action won't upload the binary_path to checks. It is useful to test your authentication and other paramaters.                                                                                                                                        |

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

## Contributing

1. clone this repository
2. create your own branch
3. create a workflow that uses your version of the action with: `uses:comediadesign/upload-to-checks-action@your-branch` (make sure you specify the correct workflow triggers)

### Versioning

To initialize a new version, run `./ci-scripts/initialize-release [major|minor|patch] "message"` and the [release.yml](./.github/workflows/release.yml) workflow will handle the rest.
