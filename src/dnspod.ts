import { Context } from "@cfworker/web";
import { parseIpType } from "./utils";

export default async function dnspod({req, res}: Context) {
  const qs = req.url.searchParams;
  const id = qs.get('id')
  const token = qs.get('token')
  const domain = qs.get('domain')
  const subdomain = qs.get('subdomain')
  const ip = qs.get('ip') ?? req.headers.get('CF-Connecting-IP')!
  const iptype = parseIpType(ip)

  const origin = await GetRecord()
  if(!origin) {
    await CreateRecord()
    res.body = `dnspod created ${subdomain}.${domain} ${ip}`;
  } else if(origin!.ip === ip) {
    res.body = `dnspod remained ${subdomain}.${domain} ${ip}`;
  } else {
    await ModifyRecord();
    res.body = `dnspod changed ${subdomain}.${domain} ${ip} ${origin!.ip}`
  }

  async function GetRecord() {
    const body = `format=json&lang=cn&login_token=${id},${token}&domain=${domain}&sub_domain=${subdomain}&record_type=${iptype}&record_line=默认`
    const json = await (await send('https://dnsapi.cn/Record.List', body)).json()
    if(json['status']['code'] === '10') return null
    if(json['status']['code'] !== '1')  throw json['status']['message']
    return {
      id: json["records"][0]['id'],
      ip: json["records"][0]['value'],
    }
  }

  async function CreateRecord() {
    const body = `format=json&lang=cn&login_token=${id},${token}&domain=${domain}&sub_domain=${subdomain}&record_type=${iptype}&value=${ip}&record_line=默认`
    const json = await (await send('https://dnsapi.cn/Record.Create', body)).json()
    if(json['status']['code'] !== '1')  throw json['status']['message']
  }

  async function ModifyRecord() {
    const body = `format=json&lang=cn&login_token=${id},${token}&domain=${domain}&sub_domain=${subdomain}&record_id=${origin!.id}&value=${ip}&record_line=默认&record_type=${iptype}`
    const json = await (await send('https://dnsapi.cn/Record.Modify', body)).json()
    if(json['status']['code'] !== '1')  throw json['status']['message']
  }
}

import pkg from '../package.json'

function send(url: string, body: any) {
  return fetch(url, {
    method: 'POST',
    body: body,
    headers: {
      'user-agent': `${pkg.name}/${pkg.version} (${pkg.author.email})`,
      'content-type': 'application/x-www-form-urlencoded'
    },
  })
}