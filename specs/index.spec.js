import { createRoutes } from '../src';
test('create routes schema', function () {
    var routes = createRoutes({
        index: '',
        aboutUs: '/about-us',
        dashboard: {
            home: '/',
            users: {
                user: function (userId) { return ({
                    _basePath: "/".concat(userId),
                    update: '/update',
                    delete: '/delete'
                }); }
            },
            blogs: function (blogId) { return "/blogs/".concat(blogId); }
        },
        auth: {
            _basePath: '',
            login: '/login',
            register: '/register'
        }
    });
    expect(routes.index).toBe('/');
    expect(routes.aboutUs).toBe('/about-us');
    expect(routes.dashboard.home).toBe('/dashboard');
    expect(routes.dashboard.users.user('1').update).toBe('/dashboard/users/1/update');
    expect(routes.dashboard.users.user('1').delete).toBe('/dashboard/users/1/delete');
    expect(routes.dashboard.blogs('1')).toBe('/dashboard/blogs/1');
    expect(routes.auth.login).toBe('/login');
    expect(routes.auth.register).toBe('/register');
});
//# sourceMappingURL=index.spec.js.map