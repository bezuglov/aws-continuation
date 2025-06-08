# aws-continuation

AWS SDK Clients with automatic continuation

## Overview

`aws-continuation` aims to simplify working with AWS SDKs by providing helper utilities that automatically continue paginated operations. When AWS services return a partial response and require you to make multiple calls to retrieve all the data, these helpers can transparently handle the continuation tokens for you.

## Installation

This project is in an early stage and is not yet published on package indexes. You can obtain the code directly from this repository:

```bash
# Clone the repository
git clone https://github.com/yourname/aws-continuation.git
cd aws-continuation
```

Install dependencies (for example, using `pip`):

```bash
pip install boto3
```

## Usage example

The following Python snippet illustrates the intent of the library—wrapping an AWS SDK client method so that all pages are fetched automatically:

```python
import boto3
from aws_continuation import paginate_all  # hypothetical helper

s3 = boto3.client("s3")

# Automatically retrieve all objects from the bucket
for obj in paginate_all(s3.list_objects_v2, Bucket="my-bucket"):
    print(obj["Key"])
```

Although the helper `paginate_all` has not yet been implemented here, the example shows how the library will make repeated calls behind the scenes until all results are returned.

## Contributing

Contributions are welcome! If you run into problems or have ideas for improvements, please open an issue. Pull requests with fixes or new features are greatly appreciated. Before submitting a PR, ensure that your changes follow any existing code style and include tests if relevant.

## License

This project is licensed under the terms of the MIT license. See the [LICENSE](LICENSE) file for details.
