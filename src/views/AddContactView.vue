<template>
  <p>this is from Task-app, check there for fixes</p>
    <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label>First Name</label>
      <input type="text" v-model="firstName" name="firstName" placeholder="First Name" />
    </div>
    <div class="form-control">
      <label>Last Name</label>
      <input type="text" v-model="lastName" name="lastName" placeholder="Last Name" />
    </div>
    <div class="form-control form-control-check">
      <label>Phone Number</label>
      <input type="text" v-model="phoneNumber" name="phoneNumber" placeholder="(xxx)-xxx-xxx" />
    </div>

  <input type="submit" value="" class="btn btn-block" />
  </form>
</template>

<script>
export default {
    name: 'AddTask',
    data() {
        return {
            contacts: [], 
            firstName: '',
            lastName: '',
            phoneNumber: '',
        }
    },
    methods: {
      async fetchContacts() {
        const res = await fetch('api/contacts')
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
          const res = await fetch(`api/contacts/${id}`, {
            method: 'DELETE',
          })
          res.status === 200 ? (this.contacts = this.contacts.filter((contact) => contact.id !== id))
          : alert('Error deleting task')
        }
      },
      onSubmit(e){

        console.log(e)
        e.preventDefault()

        if(!this.firstName || !this.lastName || !this.phoneNumber){
          alert('Terror')
          return
        }

        const newContact = {
          firstName: this.firstName,
          lastName: this.lastName,
          phoneNumber: this.phoneNumber,
        }

        this.addTask(newContact)

        this.firstName = ''
        this.lastName = ''
        this.phoneNumber = ''
      },
      async created(){
        this.contacts = await this.fetchContacts()
      }
      
    }
}
</script>