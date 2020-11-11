<template>
  <div class="q-pa-md">
    <q-table
      class="my-sticky-header-column-table"
      title="Groups"
      :data="tableData"
      :columns="columns"
      row-key="groupId"
      selection="single"
      :selected.sync="selected"
      :filter="filter"
      bordered
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

      <template v-slot:body-cell-isActive="props">
        <q-td :props="props">
          <q-avatar
            v-if="props.row.isActive"
            size="sm"
            color="positive"
            text-color="white"
            icon="done"
          />
          <q-avatar
            v-else
            size="sm"
            color="negative"
            text-color="white"
            icon="close"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-acceptsParticipants="props">
        <q-td :props="props">
          <div>
            <q-avatar
              v-if="props.row.acceptsParticipants"
              size="sm"
              color="positive"
              text-color="white"
              icon="done"
            />
            <q-avatar
              v-else
              size="sm"
              color="negative"
              text-color="white"
              icon="close"
            />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    tableData: {
      type: Array
    }
  },
  data() {
    return {
      visibleCol: [
        "name",
        "workshop",
        "participants",
        "totalSpots",
        "startDate",
        "timespan",
        "isActive",
        "acceptsParticipants"
      ],
      columns: [
        {
          name: "id",
          label: "ID",
          align: "left",
          field: "groupId",
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "name",
          required: true,
          label: "Group name",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "workshop",
          align: "center",
          label: "Workshop",
          field: "workshop",
          sortable: true,
          format: val => this.workshop(val)
        },
        { name: "module", label: "Module", field: "module", sortable: true },

        {
          name: "participants",
          label: "Participants",
          field: "participants",
          format: val => val.length.toString()
        },

        {
          name: "totalSpots",
          label: "Total Spots",
          field: "totalSpots",
          sortable: true
        },

        {
          name: "startDate",
          label: "Start date",
          field: "startDate",
          sortable: true
          //sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: "timespan",
          label: "Weeeks",
          field: "timespan",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: "isActive",
          label: "Is Active",
          field: "isActive",
          sortable: true
        },
        {
          name: "acceptsParticipants",
          label: "Is open",
          field: "acceptsParticipants",
          sortable: true
        }
      ],
      selected: [],

      filter: ""
    };
  },
  computed: {
    ...mapGetters("workshops", ["findWorkshop", "findModule"])
  },
  methods: {
    handleSelect(newSelected) {
      this.$emit("groupSelected", newSelected[0].groupId);
    },

    workshop(id) {
      return this.findWorkshop(id).name;
    },
    module(id1, id2) {
      return this.findModule(id1, id2).moduleName;
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
