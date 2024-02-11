# RapidFunnels_backend
# Em andamento
#Desenv


routes
  |__ /Usuarios
         |__ /Public 
         |     |__ /Create
         |     |__ /Login
         |     |__ /Logout
         |     |__ /GetAll
         |     |__ /GetById
         |
         |__ /Private
             |__ /Create-Admin
             |__ /Update
             |__ /Delete
             |__ /GetAll
             |__ /GetById
             |__ /GetByUserId
             |__ /GetByUserEmail
             |__ /GetByUserPhone
             |__ /GetByUserCpf
             |__ /GetByUserCnpj
             |__ /GetByUserType
             |__ /GetByUserStatus
             |__ /GetByUserCreatedAt
             |__ /GetByUserUpdatedAt
             |__ /GetByUserDeletedAt
             |__ /GetByUserLastLogin
             |__ /GetByUserLastLogout
             |__ /GetByUserLastActivity
             |__ /GetByUserLastPasswordChange
             |__ /GetByUserLastPasswordReset
             |__ /GetByUserLastPasswordRecovery
             |__ /GetByUserLastPasswordRecoveryRequest
             |__ /GetByUserLastPasswordRecoveryRequestStatus
             |__ /GetByUserLastPasswordRecoveryRequestCreatedAt
             |__ /GetByUserLastPasswordRecoveryRequestUpdatedAt
             |__ /GetByUserLastPasswordRecoveryRequestDeletedAt
             |__ /GetByUserLastPasswordRecoveryRequestExpiredAt



keeper-backend
    |__/config
    |    |__config.js
    |    |__jwtConfig.js
    |__/domain
    |    |__/auth
    |    |__/migrations
    |    |__/models
    |    |__/seeders
    |    |__/services
    |    |__/repositories
    |    |__/subscribers
    |__/enums
    |__/errors
    |    |__error.js
    |__/helpers
    |__/infrastructure
    |    |__app.js
    |    |__server.js
    |    |__swagger.js
    |__/src
    |    |__/app
    |    |    |__/controllers
    |    |    |__/routes
    |    |    |   |__/Usuario
    |    |    |   |   |__/public
    |    |    |   |   |__/private
    |    |__/tests
    |    |    |__/controllers
    |    |    |   |__/usuario.test.js
    |    |    |__/services
    |    |    |   |__/usuarioService.test.js
    |    |    |__/repositories
    |    |    |   |__/usuarioRepository.test.js
