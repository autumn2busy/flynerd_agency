const AC_URL = "https://awilliams.api-us1.com";
const AC_KEY = "0a2933218bfd5af85b3d17f067d6c3f2f93566cf4522d50de6470f4c622bf40bd23597d1";

async function checkUser4() {
    try {
        const response = await fetch(`${AC_URL}/api/3/users/4`, {
            headers: { 'Api-Token': AC_KEY }
        });
        if (response.ok) {
            const data = await response.json();
            console.log('User 4 Data:', JSON.stringify(data, null, 2));
        } else {
            console.log('User 4 does not exist (Status:', response.status, ')');
        }
    } catch (e) {
        console.error('Error fetching user 4:', e);
    }
}

async function listAllUsers() {
    try {
        const response = await fetch(`${AC_URL}/api/3/users?limit=100`, {
            headers: { 'Api-Token': AC_KEY }
        });
        const data = await response.json();
        console.log('All Users:', JSON.stringify(data.users.map(u => ({ id: u.id, username: u.username, email: u.email })), null, 2));
    } catch (e) {
        console.error('Error fetching users:', e);
    }
}

async function main() {
    await checkUser4();
    await listAllUsers();
}

main();
