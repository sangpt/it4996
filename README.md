# Installation Guide - Ubuntu 16.04

## Via `Docker` and `Docker Compose`

### Build and start docker images

```batchfile
docker-compose up
```
### Create fake data
```batchfile
docker exec web rails db:seed
```

### Everything is done!
> You can see result at http://localhost:3000

## Via real machine

### Update and Install dependencies

```batchfile
sudo apt-get update
sudo apt-get install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties libffi-dev nodejs
```

### Install ruby

```batchfile
rvm install 2.4.2
rvm use 2.4.2 --default
```

### Install Rails

```batchfile
gem install rails -v 5.1.4
```

### Install bundle

```batchfile
gem install bundle
```

### Install nodejs

```batchfile
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Install npm

```batchfile
npm -g install npm
```

### Install [yarn](https://yarnpkg.com/lang/en/docs/install) to serve load and precompile assets

```batchfile
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
```

### Install Redis

```batchfile
apt-get install redis-server redis-tool
```
### Install and start Mongodb

```batchfile
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```


### Clone code from source

```batchfile
git clone git@github.com:sangpt/it4996.git && cd it4996
```

### Install gem

```batchfile
bundle install
```

### Install yarn dependencies

```batchfile
yarn install
```
### Create fake data
```batchfile
rails db:seed
```

### Turn on Rails server
```batchfile
rails server
```

### See result
> You can see result at http://localhost:3000
