# 🌐 Deploy Frontend - Caminho dos Ventos

## 🎯 OBJETIVO
Deploy do frontend React no Vercel em 30 minutos!

---

## 🚀 PASSO A PASSO - VERCEL

### **1. Acessar Vercel**
- URL: https://vercel.com
- Fazer login com GitHub
- Conectar conta GitHub

### **2. Criar Novo Projeto**
- Clicar em "New Project"
- Selecionar repositório: `caminho-dos-ventos-frontend`
- Vercel detectará automaticamente React

### **3. Configurar Build Settings**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "installCommand": "npm install"
}
```

### **4. Configurar Variáveis de Ambiente**
```env
REACT_APP_API_URL=https://caminhos-dos-ventos-backend.railway.app/api
REACT_APP_ENV=production
```

### **5. Deploy Automático**
- Vercel fará build e deploy automático
- URL será: `https://caminho-dos-ventos.vercel.app`

---

## 🔧 CONFIGURAÇÕES TÉCNICAS

### **vercel.json**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "dest": "/static/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### **package.json**
```json
{
  "scripts": {
    "build": "react-scripts build",
    "start": "react-scripts start"
  }
}
```

---

## ✅ CHECKLIST DEPLOY

### **Antes do Deploy:**
- [ ] Repositório frontend no GitHub
- [ ] Frontend funcionando localmente
- [ ] Integração com backend testada
- [ ] Build local funcionando

### **Durante o Deploy:**
- [ ] Projeto criado no Vercel
- [ ] Repositório conectado
- [ ] Build settings configurados
- [ ] Variáveis de ambiente definidas
- [ ] Deploy iniciado

### **Após o Deploy:**
- [ ] Site acessível
- [ ] API funcionando
- [ ] Responsividade mobile
- [ ] Performance OK

---

## 🎉 RESULTADO ESPERADO

**Frontend online com:**
- ✅ Interface React funcionando
- ✅ Integração com backend
- ✅ Responsividade mobile
- ✅ Performance otimizada
- ✅ SSL/HTTPS automático
- ✅ Deploy automático no push

---

## 🚀 PRÓXIMOS PASSOS

1. **Deploy no Vercel** (30 min)
2. **Testar integração** (10 min)
3. **Configurar domínio** (30 min)
4. **Go-live!** (10 min)

**Total: 1h20min para estar 100% online!**

---

**Vamos colocar seu frontend online!** 🌐✨
