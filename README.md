# 👷 DDNS by Cloudflare Worker

One line request to implement DDNS by Cloudflare Worker.

## Deploy

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/wenshenli/ddns-cfworker)

## Usage

```bash
curl -{4|6} "https://ddns.<username>.workers.dev/<Provider>?<Keys>&domain=<domain>&subdomain=<subdomain>[&ip=<ip>]"
```

> If you don't use the `ip` parameter, it's modify the dns record to use your public ip from request.

> It is recommended to specify ipv4 or ipv6 resolve.

### DNS provider

#### Dnspod

请前往[密钥中心](https://console.dnspod.cn/account/token )申请ID和Token并按如下格式进行填写

```
<Provider> = dnspod
<Keys> = id=<id>&token=<token>
```

例子：
```bash
curl -4 "https://ddns.user.workers.dev/dnspod?id=222222&token=222222&domain=example.com&subdomain=test"
```