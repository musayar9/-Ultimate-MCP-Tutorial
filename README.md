**MCP (Model Context Protocol)**, yapay zekâ modellerinin dış dünyadaki **araçlara, verilere ve sistemlere standart bir şekilde bağlanmasını sağlayan bir protokoldür.**

En basit haliyle:

> **MCP = AI ile dış dünya arasındaki standart bağlantı**

### Basit bir örnek

Normalde Claude/Gemini/ChatGPT kendi başına senin bilgisayarındaki dosyayı okuyamaz veya GitHub'daki işlemi gerçekleştiremez.

MCP ile şöyle bir yapı kurabilirsin:

```text
                AI Model
           Claude / Gemini / GPT
                    │
                    │ MCP
                    ▼
              MCP Server
             /     |      \
            /      |       \
       Dosyalar  GitHub   Database
          │        │          │
        PDF      Repo       PostgreSQL
```

Örneğin bir **MCP Server** oluşturup AI'a şu araçları verebilirsin:

```text
read_file()
create_file()
search_files()
query_database()
create_github_issue()
run_test()
```

AI daha sonra ihtiyacı olduğunda bu araçları kullanabilir.

---

## MCP neden önemli?

Eskiden her AI uygulaması için ayrı ayrı entegrasyon yazmak gerekiyordu:

```text
Claude → GitHub entegrasyonu
Claude → PostgreSQL entegrasyonu
Claude → Google Drive entegrasyonu

Gemini → GitHub entegrasyonu
Gemini → PostgreSQL entegrasyonu
Gemini → Google Drive entegrasyonu
```

MCP bu iletişimi standartlaştırmayı amaçlıyor:

```text
             MCP
              │
       ┌──────┼──────┐
       ▼      ▼      ▼
    GitHub    DB    Files
```

Böylece bir MCP server geliştirdiğinde, onu destekleyen farklı AI istemcileriyle kullanabilirsin.

---

# MCP'nin temel parçaları

MCP öğrenirken özellikle şu kavramları görürsün:

### 1. Host

AI uygulamasıdır.

Örneğin:

* Claude Desktop
* Claude Code
* Cursor
* başka MCP destekleyen AI uygulamaları

```text
Claude Code
     │
     ▼
MCP Client
```

### 2. MCP Client

Host ile MCP Server arasındaki bağlantıyı yönetir.

```text
AI
 │
 ▼
MCP Client
 │
 ▼
MCP Server
```

### 3. MCP Server

Asıl araçların bulunduğu taraftır.

Örneğin Python ile:

```python
@mcp.tool()
def add(a: int, b: int) -> int:
    return a + b
```

AI artık:

```text
add(10, 20)
```

aracını çağırabilir.

Sonuç:

```text
30
```

---

# Tool, Resource ve Prompt nedir?

MCP öğrenirken bunlar çok önemli.

### Tool

AI'ın **iş yaptırabileceği fonksiyon**.

Örneğin:

```python
@mcp.tool()
def get_weather(city: str):
    ...
```

AI:

> İstanbul'un hava durumunu getir.

dediğinde tool'u çağırabilir.

---

### Resource

AI'ın **okuyabileceği veri/kaynak**.

Örneğin:

```text
file://project/README.md
```

veya:

```text
database://users
```

gibi kaynaklar.

---

### Prompt

AI'a belirli bir görevi nasıl yapacağını anlatan hazır prompt şablonlarıdır.

Örneğin:

```text
/code-review

Bu kodu incele:
- Bugları bul
- Güvenlik problemlerini bul
- Clean Code açısından değerlendir
```

---

# Senin açısından neden önemli?

Sen zaten **React/React Native + Python + FastAPI + AI Agent** tarafına ilerliyorsun. MCP burada özellikle önemli çünkü ileride şöyle bir sistem geliştirebilirsin:

```text
              AI Agent
                 │
                MCP
                 │
       ┌─────────┼─────────┐
       ▼         ▼         ▼
   GitHub      Files     Database
       │         │         │
       ▼         ▼         ▼
    Issues      CV       Jobs
```

Örneğin senin **Job Hunter** projen için:

```text
AI Agent
   │
   ├── search_jobs()
   ├── analyze_cv()
   ├── match_job()
   ├── generate_proposal()
   ├── save_job()
   └── get_application_status()
```

Bunları MCP tool'ları haline getirerek AI agent'ın gerçek uygulamanla kontrollü şekilde iletişim kurmasını sağlayabilirsin.

---

## MCP'yi tek cümlede düşün

Şöyle aklında tut:

> **API, yazılımların birbiriyle konuşması için standart bir kapıysa; MCP, AI modellerinin araçlarla ve verilerle konuşmasını standartlaştıran bir protokoldür.**

Ve önemli bir ayrım:

**MCP bir AI modeli değildir.**
**MCP bir framework de değildir.**
**MCP, AI'ın dış sistemlerle iletişim kurması için kullanılan açık bir protokoldür.**

Senin şu anda öğrendiğin **MCP Server → Tool → Resource → Prompt → Client → Agent** zinciri, MCP'nin temelini anlamak için doğru yol.
