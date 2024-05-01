import { prisma } from "../src/lib/prisma";

async function seed() {
    const permissionsData = [
        { id: 1, action: 'all', subject: 'manage', createdAt: new Date(), updatedAt: new Date() },
        { id: 2, action: 'read', subject: 'user', createdAt: new Date(), updatedAt: new Date() },
        { id: 3, action: 'create', subject: 'user', createdAt: new Date(), updatedAt: new Date() },
        { id: 4, action: 'update', subject: 'user', createdAt: new Date(), updatedAt: new Date() },
        { id: 5, action: 'delete', subject: 'user', createdAt: new Date(), updatedAt: new Date() },
    ];
    const roleData = [
        { id: 1, name: 'admin', description: 'Administrador', createdAt: new Date(), updatedAt: new Date() },
        { id: 2, name: 'customer', description: 'Usuário', createdAt: new Date(), updatedAt: new Date() }
    ]
    const permissionRoleData = [
        { permissionId: 1, roleId: 1, createdAt: new Date(), updatedAt: new Date() },
        { permissionId: 2, roleId: 2, createdAt: new Date(), updatedAt: new Date() },
        { permissionId: 3, roleId: 2, createdAt: new Date(), updatedAt: new Date() },
        { permissionId: 4, roleId: 2, createdAt: new Date(), updatedAt: new Date() },
        { permissionId: 5, roleId: 2, createdAt: new Date(), updatedAt: new Date() },
    ]

    const userDefaults = [
        { id: 1, name: 'Admin', display_name: 'Admin Contingency', email: 'admin.contigency@email.com', password: '88146347', currency: 'BRL', roleId: 1, createdAt: new Date(), updatedAt: new Date() },
        { id: 2, name: 'User', display_name: 'User Contingency', email: 'user.contigency@email.com', password: '88146347', currency: 'BRL', roleId: 2, createdAt: new Date(), updatedAt: new Date() }
    ]
    try {
        await prisma.$transaction(permissionsData.map(data => prisma.permission.create({ data })));
        await prisma.$transaction(roleData.map(data => prisma.role.create({ data })));
        await prisma.$transaction(permissionRoleData.map(data => prisma.permissionRole.create({ data })));
        await prisma.$transaction(userDefaults.map(data => prisma.user.create({ data })));
        console.log('Permissões criadas com sucesso');
    } catch (error) {
        console.error('Erro ao criar permissões:', error);
    } finally {
        await prisma.$disconnect();
    }
}


seed().then(() => {
    console.log('Database seeded');
    prisma.$disconnect();
})
