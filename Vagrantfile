# -*- mode: ruby -*-

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://atlas.hashicorp.com/search.
  config.vm.box = "ubuntu/trusty64"

  config.vm.provision :shell, path: "vagrant/bootstrap.sh"

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine.
  config.vm.network :forwarded_port, guest: 80, host: 4444
  # config.vm.network :forwarded_port, guest: 3306, host: 33306

  # Auto updates hosts file
  config.vm.hostname = 'localhost.miniuri.com'
  config.hostmanager.enabled = true
  config.hostmanager.manage_host = true

  config.vm.network "private_network", ip: "10.10.10.14"
  config.vm.network "public_network"
end
