# TodoApp - React and Django

<p align="justify">
Welcome to TodoApp, a meticulously crafted with Django rest framework and  react JS todo web application that combines robust security features including email verification, OTP authentication, and password hashing, with a clean and efficient codebase. Experience seamless task management in a protected environment, where your data's security is paramount, and your productivity is optimized. TaskGuard: Where organization meets peace of mind.
</p>

---

### Installation and Setup

Create a virtual environment

```bash
  python -m venv venv
```

Install dependencies

```bash
  pip install -r requirements.txt
```

Make Migrations

```bash
  python manage.py makemigrations
```

Migrate changes to database

```bash
  python manage.py migrate
```

Create a super user

```bash
  python manage.py createsuperuser
```

Run Server

```bash
  python manage.py runserver
```

Email Configuration in .env file

```bash
  HOST_EMAIL = "<YOUR_EMAIL>"
  HOST_PASSWORD = "<YOUR_PASSWORD>"
```
