base_directory=$1
ssh_user=$2
ssh_host=$3
ssh_port=$4
php_executable=$5

if [[ -z "$ssh_user" ]]; then
    echo "The workflow variable \"\$ssh_user\" is not set."

    exit 1
fi

if [[ -z "$ssh_host" ]]; then
    echo "The workflow variable \"\$ssh_host\" is not set."

    exit 1
fi

if [[ -z "$ssh_port" ]]; then
    echo "The workflow variable \"\$ssh_port\" is not set."

    exit 1
fi

if [[ -z "$base_directory" ]]; then
    echo "The workflow variable \"\$base_directory\" is not set."

    exit 1
elif [[ "$base_directory" =~ /current/?$ ]]; then
    echo "The workflow variable \"\$base_directory\" points to the \"current\" directory. It should point one level higher, to the base directory."

    exit 1
fi

if [[ -z "$php_executable" ]]; then
    php_executable="php"
fi

# Remove any trailing slash.
if [[ "$base_directory" =~ /$ ]]; then
    base_directory="${base_directory::-1}"
fi

echo "Preparing to connect to the remote server."

# If you are getting "Host key verification failed" errors, you can disable host key verification
# by uncommenting the line below.
#echo "StrictHostKeyChecking no" | tee -a /etc/ssh/ssh_config >/dev/null

# Start the SSH agent.
eval "$(ssh-agent)" >/dev/null

# Generate a unique file name for the deployment artifacts.
remote_artifacts_path="/tmp/deployment-artifacts-$(head -c 512 /dev/urandom | tr -dc 0-9a-f | head -c 8)"

echo "Uploading artifacts to the remote server."

scp -P "$ssh_port" "artifacts.tar.gz" "$ssh_user@$ssh_host:$remote_artifacts_path"

echo "Running the deployment script on the remote server."

ssh "$ssh_user@$ssh_host" -p "$ssh_port" "tar -xf $remote_artifacts_path .bitbucket/deployment/deploy.sh -O | bash -seo pipefail -- \"$remote_artifacts_path\" \"$base_directory\" \"$php_executable\""