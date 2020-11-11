<template>
  <div class="q-pa-md">
    <q-table
      class="my-sticky-header-table"
      title="Groups"
      :data="tableData"
      :columns="columns"
      row-key="groupId"
      selection="single"
      :selected.sync="selected"
      :filter="filter"
      flat
      bordered
      :visible-columns="visibleCol"
      @update:selected="handleSelect"
    >
      <template v-slot:top>
        <q-space />
        <q-input
          borderless
          dense
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
          label: "Lenght",
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
.my-sticky-header-table
  /* height or max-height is important */
  max-height: 100vh

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: scale-color($primary,$alpha: -40%)


  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
