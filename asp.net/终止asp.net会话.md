终止asp.net会话
===
```c#
Session.Abandon();
HttpCookie cookie = Response.Cookies.Get("ASP.NET_SessionId");
if (cookie != null)
{
    cookie.Value = null;
    Response.Cookies.Set(cookie);
}
```
