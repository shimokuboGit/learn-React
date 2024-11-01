import { createClient } from "@supabase/supabase-js"
import { Database } from "../../database.types"

const today = new Date()
const previousDate = new Date(today)
previousDate.setDate(today.getDate() -1)
const formatedPreviousDate = `${previousDate.getFullYear()}-${String(previousDate.getMonth() + 1).padStart(2, '0')}-${String(previousDate.getDate()).padStart(2, '0')}`

console.log(today + ' ' + formatedPreviousDate);

const supabaseClient = createClient<Database> (
  'https://ogmrlrvbnpczlkhntzgp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nbXJscnZibnBjemxraG50emdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEwMzY5NDYsImV4cCI6MjAzNjYxMjk0Nn0.1ZtXpr1PO4C5LPqHYjOCMpgkfAiBcx1dgomRlQXnUO8'
)

const { data, error } = await supabaseClient.from("users").delete().gte("created_at", formatedPreviousDate).select()
if (data === null) {
  console.log('前日に登録されたユーザーはいませんでした');
} else {
  console.log('削除されたユーザー数: ' + data.length);
  data.map(d => console.log(d))
}
error && console.log('error: ' + error?.code + error?.cause + error?.details)
