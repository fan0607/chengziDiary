1. Access Token (访问令牌):
    
    - 使用时机:每次向受保护的API发送请求时
    - 特点:短期有效,通常15分钟到几小时
    - 用途:验证用户身份和授权访问特定资源
2. Refresh Token (刷新令牌):
    
    - 使用时机:当Access Token过期时
    - 特点:长期有效,可能持续数天或数周
    - 用途:用于获取新的Access Token,无需用户重新登录
3. ID Token:
    
    - 使用时机:在OpenID Connect认证流程中
    - 特点:包含用户身份信息
    - 用途:验证用户身份,但不用于授权
4. CSRF Token (跨站请求伪造令牌):
    
    - 使用时机:在表单提交或AJAX请求中
    - 特点:每个会话唯一
    - 用途:防止跨站请求伪造攻击
5. Session Token (会话令牌):
    
    - 使用时机:在服务器端会话管理中
    - 特点:通常存储在cookie中
    - 用途:维护用户会话状态

主要区别:

1. 用途:Access Token用于授权,Refresh Token用于获取新的Access Token,ID Token用于身份验证,CSRF Token用于安全防护,Session Token用于会话管理。
    
2. 有效期:Refresh Token通常比Access Token有更长的有效期。
    
3. 存储位置:Access Token和ID Token通常存储在内存中,Refresh Token需要安全存储(如HTTP-only cookie),CSRF Token通常在表单中,Session Token通常在cookie中。
    
4. 信息内容:ID Token包含用户信息,而Access Token通常只包含必要的授权信息。
    
5. 使用频率:Access Token在每次API请求中使用,而Refresh Token只在需要刷新Access Token时使用。

在实际应用中,这些token常常配合使用,以提供全面的安全和身份验证解决方案。例如,OAuth 2.0和OpenID Connect协议就结合了Access Token、Refresh Token和ID Token的使用。

选择使用哪种token取决于你的应用需求,安全要求,以及你使用的认证/授权协议。在实施时,务必遵循安全最佳实践,如使用HTTPS,正确存储和传输token,以及及时处理token的过期和撤销。