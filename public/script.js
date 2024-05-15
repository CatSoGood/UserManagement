document.addEventListener('DOMContentLoaded', () => {
    const fetchUsers = async () => {
        const response = await fetch('/api/user/getAllUsers');
        const users = await response.json();

        const userContainer = document.getElementById('users');
        userContainer.innerHTML = '';
        users.forEach(user => {
            const userElement = document.createElement('div');
            userElement.className = 'user-entry';
            userElement.innerHTML = `
                <h3>${user.name}</h3>
                <p>Email: ${user.email}</p>
                <p>Address: ${user.address}</p>
                <div class="button-group">
                    <button class="btn-update" onclick="showUpdateForm('${user._id}', '${user.name}', '${user.email}', '${user.address}')">Update</button>
                    <button class="btn-delete" onclick="deleteUser('${user._id}')">Delete</button>
                </div>`;
            userContainer.appendChild(userElement);
        });
    };

    fetchUsers();

    document.getElementById('create-user-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;

        const response = await fetch('/api/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, address }),
        });

        const result = await response.json();
        alert(result.message || 'User created successfully!');
        fetchUsers(); // Refresh the user list
    });

    document.getElementById('update-user-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const userId = document.getElementById('update-id').value;
        const name = document.getElementById('update-name').value;
        const email = document.getElementById('update-email').value;
        const address = document.getElementById('update-address').value;

        const response = await fetch(`/api/user/update/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, address }),
        });

        const result = await response.json();
        alert(result.message || 'User updated successfully!');
        fetchUsers(); // Refresh the user list
        document.getElementById('update-user-form').classList.add('hidden');
    });
});

function showUpdateForm(id, name, email, address) {
    document.getElementById('update-id').value = id;
    document.getElementById('update-name').value = name;
    document.getElementById('update-email').value = email;
    document.getElementById('update-address').value = address;
    document.getElementById('update-user-form').classList.remove('hidden');
}

async function deleteUser(userId) {
    if (confirm("Are you sure you want to delete this user?")) {
        const response = await fetch(`/api/user/delete/${userId}`, {
            method: 'DELETE',
        });

        const result = await response.json();
        alert(result.message || 'User')
        alert(result.message || 'User deleted successfully!');
        fetchUsers(); // Refresh the user list
    }
}

