终止asp.net会话
===
```csharp
Session.Abandon();
HttpCookie cookie = Response.Cookies.Get("ASP.NET_SessionId");
if (cookie != null)
{
    cookie.Value = null;
    Response.Cookies.Set(cookie);
}
```
