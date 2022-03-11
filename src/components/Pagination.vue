<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{disabled: !pages.has_pre}">
        <a class="page-link" href="#" @click.prevent="updatePage(pages.current_page-1)" aria-label="Previous"><span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" :class="{active:page === pages.current_page }" v-for="page in pages.total_pages" :key="page+'452'">
        <a class="page-link" href="#" @click.prevent="updatePage(page)">{{page}}</a>
      </li>
      <li class="page-item" :class="{disabled: !pages.has_next}">
        <a class="page-link" href="#" @click.prevent="updatePage(pages.current_page+1)" aria-label="Next"><span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    updatePage(page) {
      this.$emit('emitPages', page)
    }
  }

}
</script>
