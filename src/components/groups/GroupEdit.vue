<template>
  <div class="q-pa-md">
    <q-card class="my-card" bordered>
      <q-card-section>
        <q-breadcrumbs class="text-accent" gutter="md">
          <template v-slot:separator>
            <q-icon size="1.2em" name="arrow_forward" color="grey" />
          </template>

          <q-breadcrumbs-el :label="workshop" icon="school" />
          <q-breadcrumbs-el :label="module" icon="design_services" />
        </q-breadcrumbs>
        <div class="row justify-between items-center q-mt-md">
          <div class="col-8">
            <div class="text-h3 q-mt-sm q-mb-xs ">
              {{ group.name }}
              <q-popup-edit v-model="name" :validate="val => val.length > 3">
                <template
                  v-slot="{
                    initialValue,
                    value,
                    emitValue,
                    validate,
                    set,
                    cancel
                  }"
                >
                  <q-input
                    autofocus
                    dense
                    :value="name"
                    hint="Group name"
                    :rules="[
                      val => validate(value) || 'More than 5 chars required'
                    ]"
                    @input="emitValue"
                  >
                    <template v-slot:after>
                      <q-btn
                        flat
                        dense
                        color="negative"
                        icon="cancel"
                        @click.stop="cancel"
                      />
                      <q-btn
                        flat
                        dense
                        color="positive"
                        icon="check_circle"
                        @click.stop="set"
                        :disable="
                          validate(value) === false || initialValue === value
                        "
                      />
                    </template>
                  </q-input>
                </template>
              </q-popup-edit>
            </div>
            <div>
              <q-badge
                class="q-mx-xs"
                align="middle"
                :label="group.isActive ? 'Active' : 'Not active'"
                :color="group.isActive ? 'accent' : 'grey'"
              >
              </q-badge>
              <q-toggle
                :label="
                  `Toggle to ${isActive ? 'inactivate' : 'activate'} this group`
                "
                color="primary"
                v-model="isActive"
                size="lg"
                lazy-rules
                :rules="[val => !!val || 'Field is required']"
              >
                <q-tooltip>
                  Set the group status to active if group is currently running.
                </q-tooltip>
              </q-toggle>
            </div>
            <div>
              <q-badge
                class="q-mx-xs"
                align="middle"
                :label="group.acceptsParticipants ? 'Open' : 'Closed'"
                :color="group.acceptsParticipants ? 'positive' : 'grey'"
              ></q-badge>
              <q-toggle
                :label="
                  acceptsParticipants
                    ? 'Toggle to close the group'
                    : 'Toggle to open the group'
                "
                color="primary"
                v-model="acceptsParticipants"
                size="lg"
                lazy-rules
                :rules="[val => !!val || 'Field is required']"
              >
                <q-tooltip>
                  Toggle to open or close the group for new members
                </q-tooltip>
              </q-toggle>
            </div>
          </div>
          <div class="col-4 self-stretch">
            <q-avatar
              :style="`background-color: ${group.color}`"
              text-color="white"
              size="xl"
              @click="showIconPicker = true"
              class="q-mb-lg"
            >
              <q-icon :name="group.icon">
                <q-tooltip>Click to pick the group icon</q-tooltip>
                <q-popup-proxy v-model="showIconPicker">
                  <q-icon-picker
                    v-model="icon"
                    icon-set="fontawesome-v5"
                    color="secondary"
                    tooltips
                    :pagination.sync="pagination"
                    style="height: 300px; width: 300px; background-color: white;"
                  />
                </q-popup-proxy>
              </q-icon>
              <q-badge
                class="q-mx-xs"
                align="middle"
                :label="freeSpots"
                floating
                :color="group.acceptsParticipants ? 'accent' : 'grey'"
              ></q-badge>
            </q-avatar>
            <div class="col">
              <q-color
                v-model="color"
                no-header
                no-footer
                default-view="palette"
                :palette="[
                  '#f94144',
                  '#f3722c',
                  '#f8961e',
                  '#f9844a',
                  '#f9c74f',
                  '#90be6d',
                  '#43aa8b',
                  '#4d908e',
                  '#577590',
                  '#277da1'
                ]"
                class="my-picker"
              />
              <span class="text-caption text-weight-light"
                >Pick group color</span
              >
            </div>
          </div>
        </div>
        <div class="text-h5 text-weight-light text-italic q-mt-sm q-mb-xs">
          Teacher: {{ group.teacher.label }}
        </div>
        <div class="row q-py-sm">
          <q-chip square>
            <q-avatar color="accent" text-color="white"
              >{{ group.totalSpots }}
            </q-avatar>
            Free spots
          </q-chip>
          <q-chip square>
            <q-avatar color="primary" text-color="white"
              >{{ group.totalSpots }}
            </q-avatar>
            <q-popup-edit v-model="spots" :validate="val => val > 0">
              <template
                v-slot="{
                  initialValue,
                  value,
                  emitValue,
                  validate,
                  set,
                  cancel
                }"
              >
                <q-input
                  autofocus
                  dense
                  type="number"
                  :value="spots"
                  hint="Group name"
                  :rules="[
                    val => validate(value) || 'More than 5 chars required'
                  ]"
                  @input="emitValue"
                >
                  <template v-slot:after>
                    <q-btn
                      flat
                      dense
                      color="negative"
                      icon="cancel"
                      @click.stop="cancel"
                    />
                    <q-btn
                      flat
                      dense
                      color="positive"
                      icon="check_circle"
                      @click.stop="set"
                      :disable="
                        validate(value) === false || initialValue === value
                      "
                    />
                  </template>
                </q-input>
              </template>
            </q-popup-edit>
            Total spots
          </q-chip>
        </div>
      </q-card-section>
      <q-card-section class="q-mb-lg">
        <div class="row justify-between items-baseline">
          <div class="column items-start justify-start">
            <span class="text-body1">Group begins on</span>
            <q-chip square size="lg" class="q-ma-none">
              <q-avatar color="secondary" text-color="white" icon="event" />
              {{ group.startDate }}
            </q-chip>
          </div>

          <div class="column items-start justify-start">
            <span class="text-body1">Group lasts</span>
            <q-chip square size="lg" class="q-ma-none">
              <q-avatar color="info" text-color="dark"
                >{{ group.timespan }}
              </q-avatar>
              Weeks
            </q-chip>
          </div>
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
    </q-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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

  data() {
    return {
      expandedCalendar: false,
      expandedParticipants: false,
      filter: "",
      nickname: "",
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
          name: "contact",
          label: "Contact",
          field: "contact",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        }
      ],
      pagination: {
        itemsPerPage: 35,
        page: 0
      },
      showIconPicker: false
    };
  },
  computed: {
    ...mapGetters("workshops", [
      "findWorkshop",
      "findModule",
      "selectedGroupName"
    ]),
    freeSpots() {
      return this.group.totalSpots - this.group.participants.length;
    },
    workshop() {
      if (typeof this.group.workshop === "string")
        return this.findWorkshop(this.group.workshop).name;
      else return this.group.workshop.label;
    },
    module() {
      if (typeof this.group.module === "string")
        return this.findModule(this.group.workshop, this.group.module)
          .moduleName;
      else return this.group.module.label;
    },

    lessons() {
      if (typeof this.group.module === "string") return this.group.groupId;
      else return "new";
    },

    name: {
      get() {
        return this.$store.state.groups.selectedGroup.name;
      },
      set(value) {
        this.$store.commit("groups/selectedGroupName", value);
      }
    },

    isActive: {
      get() {
        return this.$store.state.groups.selectedGroup.isActive;
      },
      set(val) {
        this.$store.commit("groups/selectedGroupIsActive", val);
      }
    },

    acceptsParticipants: {
      get() {
        return this.$store.state.groups.selectedGroup.acceptsParticipants;
      },
      set(val) {
        this.$store.commit("groups/selectedGroupAcceptsParticipants", val);
      }
    },
    color: {
      get() {
        return this.$store.state.groups.selectedGroup.color;
      },
      set(val) {
        this.$store.commit("groups/selectedGroupColor", val);
      }
    },

    icon: {
      get() {
        return this.$store.state.groups.selectedGroup.icon;
      },
      set(val) {
        this.$store.commit("groups/selectedGroupIcon", val);
      }
    },
    spots: {
      get() {
        return this.$store.state.groups.selectedGroup.totalSpots;
      },
      set(val) {
        this.$store.commit("groups/selectedGroupTotalSpots", val);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.my-card {
  width: 100%;
}
</style>
