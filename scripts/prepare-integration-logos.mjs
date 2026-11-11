import {mkdir,writeFile} from 'node:fs/promises';
const names=['slack','notion','stripe','shopify','hubspot','googlesheets','gmail','zapier','n8n','github','openai'];
await mkdir('public/integrations',{recursive:true});
for(const name of names){const res=await fetch(`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${name}.svg`);if(!res.ok){console.log(name,res.status);continue;}const svg=await res.text();await writeFile(`public/integrations/${name}.svg`,svg);console.log(name,'saved');}
