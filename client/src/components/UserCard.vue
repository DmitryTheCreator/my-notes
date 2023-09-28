<template>
  <div class="user-card my-3 lato-font">
    <div
      v-tooltip:top.tooltip="'ID'" 
      class="width-id height d-flex big-24 bold bisque-b-color rounded_left"
    >
      {{ user.id }}
    </div>
    <div class="width-login height left px-4 merriweather-font big-24 white-b-color">
      <div class="my-1">{{ user.login }}</div>
    </div>
    <div 
      v-tooltip:top.tooltip="'Активация/Деактивация аккаунта'" 
      class="width-icon height d-flex green"
      @click="changeUserActive"
    >
      <img src="/icons/lock.svg"/>
    </div>
    <div class="width-field height d-flex big-20 silver">{{ userActive }}</div>
    <div 
      v-tooltip:top.tooltip="'Смена роли пользователя'" 
      class="width-icon height d-flex yellow"
      @click="changeUserRole"
    >
      <img src="/icons/role.svg"/>
    </div>
    <div class="width-field height d-flex big-20 silver">{{ userRole }}</div>
    <div 
      v-tooltip:top.tooltip="'Удаление аккаунта'" 
      class="width-icon height d-flex red rounded-right"
      @click="deleteUserAccount"
    >
      <img src="/icons/delete.svg"/>
    </div>
  </div>
</template>

<script>
import { watch, ref } from 'vue'
import Tooltip from '../components/UI/Tooltip.vue'
import { changeActiveStatus, changeRole, deleteUser } from '../http/usersApi'
import jwt_decode from 'jwt-decode'

const checkId = (card_id) => {
  const user_id = jwt_decode(localStorage.getItem('token')).id
  return user_id === card_id
}

export default {
  props: {
    user: Object,
    reload: Function
  }, 
  components: { Tooltip },
  setup(props) {
    const userActive = ref(props.user.active)
    const userRole = ref(props.user.role)
    
    const changeUserActive = async () => {
      try {
        if (!checkId(props.user.id)) {
          const changedUser = await changeActiveStatus(props.user.id)
          props.user.active = changedUser.data.active
        } else {
          alert('Активировать/Деактивировать свой аккаунт запрещено!')
        }        
      } catch (error) {
        alert(`Ошибка активации/деактивации аккаунта: ${error.message}`);
      }
    }

    const changeUserRole = async () => {
      try {
        if (!checkId(props.user.id)) {
          const changedUser = await changeRole(props.user.id)
          props.user.role = changedUser.data.role
        } else {
          alert('Изменять роль своего аккаунта запрещено!')
        }
          
      } catch (error) {
        alert(`Ошибка смены роли пользователя: ${error.message}`);
      }
    }

    const deleteUserAccount = async () => {
      try {
        if (!checkId(props.user.id)) {
          console.log(props.user.id)
          const isConfirmed = window.confirm(`Вы действительно хотите удалить пользователя ${props.user.login}?`)
          if (isConfirmed) {
            await deleteUser(props.user.id)
            props.reload()
          }
        } else {
          alert('Удалять свой аккаунт запрещено!')
        }   
      } catch (error) {
        alert(`Ошибка удаления пользователя: ${error.message}`);
        console.log(error);
      }
    }

    watch(() => props.user.active, () => {
      userActive.value = props.user.active
    })

    watch(() => props.user.role, () => {
      userRole.value = props.user.role
    })
    

    return { changeUserActive, userActive, changeUserRole, userRole, deleteUserAccount }
  }
}
</script>

<style scoped>
.user-card {
  display: flex;
  width: 100%;
  margin-top: 100px;
  height: 60px;
}

.d-flex {
  display: flex;
  align-items: center;
  justify-content: center;
}

.left {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.height {
  height: 100%;
}

.width-id {
  width: 80px;
}

.width-login {
  width: 540px;
}

.width-icon {
  width: 60px;
}

.width-field {
  width: 200px;
}

.rounded_left {
  border-radius: 6px 0 0 6px;
}

.rounded-right {
  border-radius: 0 6px 6px 0;
}

.green {
  background-color: #198754;
  transition: background-color 0.1s ease;
}

.green:hover {
  background-color: #157347;
}

.yellow {
  background-color: #FFBB5C;
  transition: background-color 0.1s ease;
}

.yellow:hover {
  background-color: #E88E48;
}

.red {
  background-color: #B04B3A;
  transition: background-color 0.1s ease;
}

.red:hover {
  background-color: #9A3B3B;
}

.silver {
  background-color: #D9D9D9;
}
</style>