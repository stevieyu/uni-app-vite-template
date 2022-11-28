<template>
  <uni-list>
    <uni-list-item v-for="i in list" :key="i._id"
                   clickable showArrow
                   link :to="`/NearbyBooksShare/form?q=`+i.book.isbn"
                   :title="i.book.title"
                   :note="`${i.book.year} ${i.book.author_name} ${i.book.isbn}`"
                   :thumb="i.book.pic"
    />
  </uni-list>
</template>

<script setup>
import UserBooks from "@/NearbyBooksShare/models/UserBooks";
import ApplyBooks from "@/NearbyBooksShare/models/ApplyBooks";
import {me} from "@/features/common/services/mpserverless";
import Books from "@/NearbyBooksShare/models/Books";

let list = $ref([])

me().then((res) => {
  UserBooks.find({
    auth: {
      userId: res.userId
    }
  }).then((meBooks) => {
    Promise.all([
      Books.find({
        _id: {
          $in: meBooks.map(i => i.bookid)
        }
      }),
      ApplyBooks.find({
        userbookid: {
          $in: meBooks.map(i => i._id)
        }
      })
    ])
    .then(([books, applyBooks]) => {
      list = meBooks.map(i => {
        i.book = books.find(ii => ii._id === i.bookid)
        i.apply = applyBooks.find(ii => ii.userbookid === i._id)
        return i
      })
    })
  })
})

uni.setNavigationBarTitle({title: '我的图书'})
</script>
