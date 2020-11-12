<template>
  <div class="q-pa-md">
    <q-table
      class="my-sticky-header-column-table"
      title="Participants"
      :data="allParticipants"
      :columns="columns"
      row-key="id"
      :selected.sync="selected"
      :filter="filter"
      bordered
      dense
      selection="multiple"
      :visible-columns="visibleCol"
      @update:selected="handleSelect"
    >
      <template v-slot:top>
        <span class="text-h6">Groups</span>
        <q-space />
        <q-input
          rounded
          dense
          standout="bg-white text-dark"
          debounce="300"
          color="primary"
          v-model="filter"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      visibleCol: ["name", "birthday", "userId"],
      columns: [
        {
          name: "id",
          label: "ID",
          align: "left",
          field: "id",

          sortable: true
        },
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: "name",
          sortable: true
        },
        {
          name: "userId",
          align: "center",
          label: "Parent",
          field: "userId",
          sortable: true,
          format: val => {
            this.parent(val);
          }
        },

        {
          name: "birthday",
          label: "birthday",
          field: "birthday"
        }
      ],
      selected: [],

      filter: ""
    };
  },
  computed: {
    ...mapGetters("workshops", ["findWorkshop", "findModule"]),
    ...mapGetters("participants", ["allParticipants"]),
    ...mapGetters("users", ["findUser"]),

    selectedParticipantsIds() {
      return this.selected.map(el => el.id);
    }
  },
  methods: {
    handleSelect() {
      this.$emit("participant-selected", this.selectedParticipantsIds);
    },

    parent(id) {
      return this.findUser(id);
    }
  }
};
</script>

<style lang="sass">
.my-sticky-header-column-table
  /* height or max-height is important */
  max-height: 100vh

  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  //max-width: 600px

  td:first-child
    /* bg color is important for td; just specify one */
    background-color: $accent !important

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: $primary

  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0
</style>
