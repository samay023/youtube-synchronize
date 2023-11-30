provider "aws" {
  region = "ap-southeast-2"
}

resource "tls_private_key" "private_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "generated_key" {
  key_name   = "alans-key"
  public_key = tls_private_key.private_key.public_key_openssh
}

resource "local_file" "key" {
  content  = tls_private_key.private_key.private_key_pem
  filename = "ec2_key"
}

resource "aws_instance" "demo_server" {
  ami           = "ami-0361bbf2b99f46c1d"
  instance_type = "t2.micro"
  key_name      = aws_key_pair.generated_key.key_name
  depends_on    = [local_file.key, aws_key_pair.generated_key]
}
