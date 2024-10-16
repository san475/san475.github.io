<script setup lang="ts">

let name = ref('')
let balance = ref<number>()
let interest = ref<number>()

let loanList: Ref<Loan[]> = ref<Loan[]>([
  { name: 'test', balance: 100, interest: .03 },
  { name: 'test2', balance: 103, interest: .13 },
  { name: 'test3', balance: 1000, interest: .65 },
]);

let errorMessage = ref<string>();

const addNewLoan = () => {

  if (name.value === '' || balance.value === undefined || interest.value === undefined) {
    errorMessage.value = 'Missing information'
    return
  }

  if (interest.value > 1 || interest.value < 0) {
    errorMessage.value = 'Interest out of bounds'
    return
  }

  loanList.value.push({
    name: name.value,
    balance: balance.value,
    interest: interest.value
  })

  name.value = ''
  balance.value = undefined;
  interest.value = undefined;

  errorMessage.value = undefined;
}


</script>

<template>
  <h1>College loan calculator</h1>

  <div v-if="errorMessage" class="error">
    <span> {{ errorMessage }}</span>
  </div v-if>

  <div class="calculator">
    Loan Name:
    <p><input v-model="name" placeholder="name"></p>
    Loan Balance:
    <p><input type="number" v-model="balance" placeholder="balance"></p>
    Loan Interest (decimal):
    <p><input type="number" v-model="interest" placeholder="interest"></p>

    <div class="new-loan-display">
      <h2>New Loan</h2>
      <p> <b>Loan Name: {{ name }} </b>
      </p>
      <p> Balance: {{ balance }}</p>
      <p> Interest: {{ interest }}</p>
    </div>

    <button @click="addNewLoan">
      Add loan
    </button>

    <div class="loan-list-display">
      <div v-for="loan in loanList">
        <div class="loan-list-display-row">
          <div class="loan-list-display-item">
            <b>{{ loan.name }}:</b>
          </div>
          <div class="loan-list-display-item">
            Loan Balance: {{ loan.balance }}
          </div>
          <div class="loan-list-display-item">
            Loan Interest: {{ loan.interest }}
          </div>
        </div>
      </div>

      total balance: {{ loanList.reduce((accumulator, currentLoan: Loan): number => {
        return accumulator + currentLoan.balance;
      }, 0) }}
    </div>


  </div>
</template>

<style>
p {
  margin: 0;
}

.new-loan-display {
  margin: 10px 0px;
  padding: 10px;
  background: lightgray;

}

.new-loan-display h2 {
  margin: 0px 0px 10px 0px;
}

.loan-list-display {
  margin: 10px 0px;
  background-color: rgb(177, 229, 199);
  padding: 10px;
}

.loan-list-display-row {
  margin: 0px 0px;
  background-color: lightgray;
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: 10px 0px;
  grid-template-areas:
    "col1-item1 col2-item1 col3-item1";
}

.loan-list-display-item {
  background-color: white;
  border-width: 1px;
  border-style: solid;
  border-color: gray;
  border-radius: 2px;
  padding: 1px 5px;
  margin: 1px 0px;
}

.error {
  color: maroon;
  font-size: xx-large;
  font-weight: bolder;
  margin: 10px 0px;
}
</style>