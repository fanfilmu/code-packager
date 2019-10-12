# Code packager Serverless component

Package your code library regardless* of the language.

*definitely work in progress; for now only Ruby (and very specific cases of Ruby) are supported.

1. [Install](#1-install)
2. [Create](#2-create)
3. [Configure](#3-configure)
4. [Deploy](#4-deploy)

### 1. Install

```console
$ npm install -g serverless
```

### 2. Create

```console
$ mkdir my-ruby-lambda
$ cd my-ruby-lambda
```

the directory should look something like this:


```
|- backend
  |- handler_one.rb
|- Gemfile
|- serverless.yml
```

```Gemfile
gem 'production_gem'

group :development do
  gem 'that_wont_be_installed'
end
```

The `backend` sub-directory contains all of the code for the lambdas. You can have
separate directories for frontend or other resources - this package helps with making
lambdas have only the code which they really need.

### 3. Configure

```yml
# serverless.yml

backendCode:
  component: "@fanfilmu/code-packager"
  inputs:
    driver: "ruby" # option "script" coming soon, which will run arbitrary build script
    code:
      root: ./ # The root of the application (contains Gemfile)
      src: ./backend # The folder with the lambda code

helloEndpoint:
  component: "@serverless/aws-lambda"
  inputs:
    code: ${backendCode.path}
    description: Sample HTTP endpoint
    handler: handler_one.process
    runtime: ruby2.5
```

### 4. Deploy

```console
$ serverless
```

### New to Components?

Checkout the [Serverless Components](https://github.com/serverless/components) repo for more information.
