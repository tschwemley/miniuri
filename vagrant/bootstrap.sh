#!/usr/bin/env bash

echo "Updating packages..."
apt-get update

# Git
echo "Installing git"
apt-get install -y git

# Nginx
echo "Installing Nginx"
apt-get install -y nginx

# Nginx config
echo "Configuring Nginx"
cp /vagrant/vagrant/conf/miniuri.conf /etc/nginx/sites-available/miniuri.conf
ln -s /etc/nginx/sites-available/miniuri.conf /etc/nginx/sites-enabled/miniuri.conf

rm -rf /etc/nginx/sites-available/default

service nginx restart

# Nodejs and npm
echo "Installing node and npm"
apt-get install -y node
apt-get install -y npm

echo "Provisioning finished"
