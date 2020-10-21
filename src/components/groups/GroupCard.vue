<template>
  <q-card class="my-card" flat bordered>
    <q-card-section>
      <q-breadcrumbs class="text-accent" gutter="md">
        <template v-slot:separator>
          <q-icon size="1.2em" name="arrow_forward" color="grey" />
        </template>

        <q-breadcrumbs-el :label="group.workshop.label" icon="school" />
        <q-breadcrumbs-el :label="group.module.label" icon="design_services" />
      </q-breadcrumbs>
      <div class="row justify-between items-center q-mt-md">
        <div class="text-h4 q-mt-sm q-mb-xs">{{ group.name }}</div>
        <q-avatar
          :style="`background-color: ${group.color}`"
          text-color="white"
          size="xl"
          @click="showIconPicker = true"
        >
          <q-icon :name="group.icon"
        /></q-avatar>
      </div>
      <div class="text-h5 text-weight-light text-italic q-mt-sm q-mb-xs">
        Teacher: {{ group.teacher }}
      </div>
    </q-card-section>
    <q-card-section>
      <div class="row q-py-sm">
        <q-chip size="lg" square>
          <q-avatar color="accent" text-color="white" icon="event" />
          {{ group.startDate }}
        </q-chip>

        <q-chip size="lg" square>
          <q-avatar color="secondary" text-color="white"
            >{{ group.timespan }}
          </q-avatar>
          Weeks
        </q-chip>
      </div>

      <div class="row q-py-sm">
        <q-chip size="lg" square>
          <q-avatar color="accent" text-color="white"
            >{{ group.totalSpots }}
          </q-avatar>
          Free spots
        </q-chip>
        <q-chip size="lg" square>
          <q-avatar color="primary" text-color="white"
            >{{ group.totalSpots }}
          </q-avatar>
          Total spots
        </q-chip>
      </div>

      <div class="row ">
        <q-checkbox
          disable
          v-model="group.isActive"
          label="Group is currently running"
        />
        <q-checkbox
          disable
          v-model="group.acceptsParticipants"
          label="Group accepts participants"
        />
      </div>
    </q-card-section>
    <!--    <q-card-actions>-->
    <!--      <q-btn-->
    <!--        v-show="group.participants.length > 0"-->
    <!--        color="primary"-->
    <!--        icon="mail"-->
    <!--        label="All participants"-->
    <!--      />-->
    <!--    </q-card-actions>-->

    <q-expansion-item
      group="somegroup"
      icon="child_care"
      label="Participants"
      header-class="text-weight-light text-h6"
    >
      <q-table
        class="my-sticky-header-table full-width"
        :data="group.participants"
        :columns="columns"
        row-key="name"
        flat
        dense
        :filter="filter"
        no-data-label="No one is attending this group yet"
        no-results-label="No one like that is a member of this group"
      >
        <template v-slot:top-left>
          <q-input dense debounce="300" v-model="filter" placeholder="Search">
            <q-icon slot="append" name="search" />
          </q-input>
        </template>

        <template v-slot:top-right>
          <q-btn
            v-show="group.participants.length > 0"
            color="accent"
            outline
            size="sm"
            rounded
            icon="mail"
            label="all participants"
          />
        </template>

        <template v-slot:body-cell-calcium="props">
          <q-td :props="props">
            <div>
              <q-btn round size="xs" color="accent"
                ><q-icon name="mail" color="white"></q-icon
              ></q-btn>
              <!--                  <q-badge color="purple" :label="props.value" />-->
            </div>
          </q-td>
        </template>

        <template v-slot:no-data="{ icon, message, filter }">
          <div class="full-width row flex-center text-accent q-gutter-sm">
            <q-icon size="2em" name="sentiment_dissatisfied" />
            <span> Well this is sad... {{ message }} </span>
            <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
          </div>
        </template>
      </q-table>
    </q-expansion-item>
    <q-expansion-item
      group="somegroup"
      icon="date_range"
      label="Calendar"
      header-class="text-weight-light text-h6"
    >
      <CalendarLayout />
    </q-expansion-item>

    <!--    <q-slide-transition>-->
    <!--      <div v-show="expandedCalendar">-->
    <!--        <q-separator />-->
    <!--        <q-card-section class="text-subitle2">-->
    <!--         -->
    <!--        </q-card-section>-->
    <!--      </div>-->
    <!--    </q-slide-transition>-->
    <!--    <q-slide-transition>-->
    <!--      <div v-show="expandedParticipants">-->
    <!--        <q-separator />-->
    <!--        <q-card-section class="text-subitle2"> </q-card-section>-->
    <!--      </div>-->
    <!--    </q-slide-transition>-->
  </q-card>
</template>

<script>
import CalendarLayout from "layouts/CalendarLayout";
export default {
  name: "GroupCard",
  props: {
    group: {
      type: Object,
      required: true,
      default: function() {
        return {
          name: "Group example",
          workshop: "Workshop name",
          module: "Module Name",
          teacher: "Rychu",
          totalSpots: 23,
          location: "Warszawa",
          color: "#019A9D",
          icon: "fas fa-lightbulb",
          isActive: false,
          acceptsParticipants: true,
          startDate: "21-10-2020",
          timespan: 3,
          lessons: [],
          participants: [
            {
              name: "Ala Makota",
              parent: "Lolo Karwowski",
              calcium: "14%",
              iron: "1%"
            },
            {
              name: "Makot Alan",
              parent: "Lolo Karwowski",
              calcium: "14%",
              iron: "1%"
            },
            {
              name: "Kfrystek Patafian",
              parent: "Golo Malowski",
              calcium: "14%",
              iron: "1%"
            },
            {
              name: "Jurek Patafian",
              parent: "Golo Malowski",
              calcium: "14%",
              iron: "1%"
            },
            {
              name: "Frozen Yogurt",
              parent: "Lolo Karwowski",
              calcium: "14%",
              iron: "1%"
            },
            {
              name: "Frozen Yogurt",
              parent: "Lolo Karwowski",
              calcium: "14%",
              iron: "1%"
            },
            {
              name: "Frozen Yogurt",
              parent: "Lolo Karwowski",
              calcium: "14%",
              iron: "1%"
            }
          ]
        };
      }
    }
  },
  components: {
    CalendarLayout
  },
  data() {
    return {
      expandedCalendar: false,
      expandedParticipants: false,
      filter: "",
      columns: [
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "parent",
          align: "center",
          label: "Parent",
          field: "parent",
          sortable: true
        },

        {
          name: "calcium",
          label: "Contact",
          field: "calcium",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: "iron",
          label: "Iron (%)",
          field: "iron",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        }
      ]
    };
  },
  computed: {
    freeSpots() {
      return this.group.totalSpots - this.group.participants.length;
    }
  }
};
</script>

<style scoped lang="scss">
.my-card {
  width: 100%;
  max-width: 600px;
}
</style>
