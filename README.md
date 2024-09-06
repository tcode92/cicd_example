# Step-by-step Guide to Set Up Basic CI/CD with GitHub Actions on a Private VPS

### 1. Generate SSH Keys for GitHub Actions

Log in to your VPS:

```bash
ssh-keygen -t rsa -b 4096 -C "github@actions.com" -f github-actions -N ""
```

This will generate a public key (`github-actions.pub`) and a private key (`github-actions`).

### 2. Add the Public Key to the `authorized_keys`

```bash
cat github-actions.pub >> ~/.ssh/authorized_keys
```

### 3. Set Up GitHub Actions Secrets for Your Repository

Go to your repository's settings and add your secrets in Secrets and variables > Actions.

You will need to copy the private key you generated earlier and add it to a GitHub Actions secret.

### 4. Edit the GitHub Workflow to Suit Your Needs

Edit the env section in `.github/workflows/deploy.yml` with your secrets.

Update the `run` commands according to the requirements of your VPS environment and commands.
