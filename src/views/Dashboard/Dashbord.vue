<template>
  <div>
    <dashboard-admin v-if="profile === 'ADMIN'"></dashboard-admin>
    <dashboard-receptionist v-else-if="profile === 'RECEPCIONISTA'"></dashboard-receptionist>
    <dashboard-instructor v-else-if="profile === 'INSTRUTOR'"></dashboard-instructor>
    <dashboard-nutritionist v-else-if="profile === 'NUTRICIONISTA'"></dashboard-nutritionist>
    <dashboard-student v-else-if="profile === 'ALUNO'"></dashboard-student>
  </div>
</template>

<script>
import DashboardAdmin from '../../components/DashboardAdmin.vue';
import DashboardReceptionist from '../../components/DashboardReceptionist.vue';
import DashboardInstructor from '../../components/DashboardInstructor.vue';
import DashboardNutritionist from '../../components/DashboardNutritionist.vue';
import DashboardStudent from '../../components/DashboardStudent.vue';

export default {
  components: {
    DashboardAdmin,
    DashboardReceptionist,
    DashboardInstructor,
    DashboardNutritionist,
    DashboardStudent
  },
  data() {
    return {
      profile: localStorage.getItem('@profile'),
    };
  },
};
</script>
