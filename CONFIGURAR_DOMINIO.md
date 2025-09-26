# 🌍 Configurar Domínio Gratuito - Caminho dos Ventos

## 🎯 OBJETIVO
Configurar domínio próprio gratuito em 30 minutos!

---

## 🚀 PASSO A PASSO - FREENOM

### **1. Registrar Domínio Gratuito**
- **URL:** https://freenom.com
- **Domínio sugerido:** `caminhodosventos.tk`
- **Alternativas:** `.ml`, `.ga`, `.cf`, `.tk`

### **2. Criar Conta**
- Fazer cadastro no Freenom
- Verificar email
- Fazer login

### **3. Registrar Domínio**
- Clicar em "Register a new domain"
- Digitar: `caminhodosventos`
- Selecionar extensão: `.tk`
- Clicar em "Check Availability"
- Se disponível, clicar em "Get it now!"

### **4. Configurar DNS**
- Acessar "My Domains"
- Clicar em "Manage Domain"
- Ir para "Manage Freenom DNS"

### **5. Configurar Registros DNS**
```
Type: CNAME
Name: www
Value: caminho-dos-ventos.vercel.app
TTL: 3600

Type: A
Name: @
Value: 76.76.19.61
TTL: 3600
```

---

## 🔧 CONFIGURAÇÃO NO VERCEL

### **1. Adicionar Domínio**
- Acessar projeto no Vercel
- Ir para "Settings" → "Domains"
- Clicar em "Add Domain"
- Digitar: `caminhodosventos.tk`

### **2. Configurar SSL**
- Vercel configurará SSL automaticamente
- Aguardar propagação (5-10 minutos)

### **3. Configurar Subdomínio**
- Adicionar também: `www.caminhodosventos.tk`
- Configurar redirect para domínio principal

---

## ⚙️ CONFIGURAÇÕES TÉCNICAS

### **DNS Records**
```
# Domínio principal
@ A 76.76.19.61

# Subdomínio www
www CNAME caminho-dos-ventos.vercel.app

# Subdomínio api (opcional)
api CNAME caminhos-dos-ventos-backend.railway.app
```

### **CORS Update**
```typescript
// main.ts - Backend
app.enableCors({
  origin: [
    'https://caminhodosventos.tk',
    'https://www.caminhodosventos.tk',
    'https://caminho-dos-ventos.vercel.app'
  ],
  credentials: true,
});
```

---

## ✅ CHECKLIST DOMÍNIO

### **Registro:**
- [ ] Conta criada no Freenom
- [ ] Domínio registrado
- [ ] DNS configurado
- [ ] Propagação aguardada

### **Vercel:**
- [ ] Domínio adicionado no projeto
- [ ] SSL configurado
- [ ] Subdomínio www configurado
- [ ] Redirects funcionando

### **Backend:**
- [ ] CORS atualizado
- [ ] Deploy realizado
- [ ] Testes de integração

---

## 🎉 RESULTADO ESPERADO

**Domínio funcionando com:**
- ✅ `https://caminhodosventos.tk` (principal)
- ✅ `https://www.caminhodosventos.tk` (www)
- ✅ SSL/HTTPS automático
- ✅ Redirects configurados
- ✅ Integração com backend

---

## 🚨 TROUBLESHOOTING

### **Domínio não resolve:**
- Aguardar propagação DNS (até 24h)
- Verificar configurações DNS
- Testar com `nslookup caminhodosventos.tk`

### **SSL não funciona:**
- Aguardar configuração automática (5-10 min)
- Verificar se domínio está no Vercel
- Forçar renovação SSL

### **CORS errors:**
- Atualizar CORS no backend
- Fazer novo deploy
- Verificar URLs exatas

---

## 🚀 PRÓXIMOS PASSOS

1. **Registrar domínio** (15 min)
2. **Configurar DNS** (10 min)
3. **Configurar no Vercel** (5 min)
4. **Testar funcionamento** (10 min)

**Total: 40 minutos para domínio próprio!**

---

## 💰 CUSTO

**100% GRATUITO:**
- Freenom: Domínio gratuito
- Vercel: SSL gratuito
- DNS: Gratuito
- **Total: R$ 0,00**

---

**Vamos configurar seu domínio próprio!** 🌍✨
