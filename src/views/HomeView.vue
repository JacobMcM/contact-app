<template>
  <p>table: https://codepen.io/ivillamil/pen/jWjgzE</p>
  <Table>
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Phone Number</th>
      <th>Delete</th>
    </tr> 
    
    <tr v-for="contact in contacts" :key="contact.id">      
      <td>
        <router-link :to="`/destination/${contact.id}`">
          {{ contact.firstName }}
            
        </router-link>
      </td>

      <td>
        <router-link :to="`/destination/${contact.id}`">
          {{ contact.lastName }}            
        </router-link>
      </td>

      <td>
        <router-link :to="`/destination/${contact.id}`">
          {{ contact.phoneNumber }}            
        </router-link>
      </td>

      <td>
        <p @click="deleteTask">Delete</p>
      </td>
    </tr>
    
  </Table>
</template>

<script>
  export default{
    name: 'Home',
    data() {
      return {
        contacts: [],
      }
    },
    methods: {
      async fetchContacts() {
        console.log('taking a good long look')
        const res = await fetch('api/contacts')
        const data = await res.json()
        return data
      },
        async fetchContact(id) {
        console.log('are we looking for id?')
        const res = await fetch(`../api/contacts/${id}`)
        const data = await res.json()
        return data
      },
      async addTask(contact) {
        const res = await fetch('api/contacts', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(contact),
        })
        const data = await res.json()
        this.contacts = [...this.contacts, data]
      },
      async deleteTask(id) {
        if (confirm('Are you sure?')) {
          console.log('will this break? line 73')
          const res = await fetch(`../api/contacts/${id}`, {
            method: 'DELETE',
          })
          res.status === 200 ? (this.contacts = this.contacts.filter((contact) => contact.id !== id))
          : alert('Error deleting task')
        }
      },

    },
    async created(){
      console.log(await fetch('api/contacts'));

      this.contacts = await this.fetchContacts()
    }
  }
</script>