<template>
  <div>
    <form class="form" id="formPayment" @submit.prevent="sendOrder">
      <div class="form-type">
        <div class="form-type-field">
          <input
            type="radio"
            name="cardPayment"
            v-model="formData.typeCredit"
            value="D"
            id="radioCardPayment"
            required
          />
          <p>Cartão de débito</p>
        </div>
        <div class="form-type-field">
          <input
            type="radio"
            name="cardPayment"
            v-model="formData.typeCredit"
            value="C"
            id="radioCardPayment"
            required
          />
          <p>Cartão de crédito</p>
        </div>
      </div>
      <input
        class="form-card"
        type="text"
        placeholder="Número do cartão"
        v-model="formData.cardNumber"
        required
      />
      <input
        class="form-name"
        type="text"
        placeholder="Nome impresso do cartão"
        v-model="formData.cardName"
        required
      />
      <input
        class="form-expire"
        type="text"
        placeholder="Validade"
        v-model="formData.cardDate"
        required
      />
      <input
        class="form-cvv"
        type="text"
        placeholder="CVV"
        v-model="formData.cardSecretyNumber"
        required
      />
      <input
        class="form-cpf"
        type="text"
        placeholder="CPF do titular"
        v-model="formData.cardCPF"
        required
      />
      <!-- <div class="form-checkbox">
      <input type="checkbox" />
      <p>Desejo inserir CPF na nota</p>
    </div> -->
      <button class="form-btn">Fazer pedido</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    condominium: Object,
    cartProducts: Array,
    total: Number,
  },
  data() {
    return {
      formData: {
        typeCredit: "",
        cardNumber: "",
        cardName: "",
        cardDate: "",
        cardSecretyNumber: "",
        cardCPF: "",
      },
      userId: "",
      scheduling: {
        schedule: this.condominium.schedule,
        weekDay: this.condominium.weekDay,
      },
    };
  },
  created() {
    this.getUserId();
  },
  methods: {
    getUserId() {
      this.userId = localStorage.getItem("id");
    },
    OrderData() {
      return {
        userId: this.userId,
        totalPrice: this.total,
        payment: this.formData,
        scheduling: this.scheduling,
        items: this.cartProducts,
        condominiumId: JSON.parse(localStorage.getItem("condominium"))._id,
      };
    },
    async sendOrder() {
      await axios
        .post(
          "http://frutifeira.us-east-1.elasticbeanstalk.com/api/v1.0/orders",
          this.OrderData(),
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          },
        )
        .then(() => {
          console.log("pedido recebido");
          this.$emit("openModalSuccess");
          // location.reload();
          //this.$router.push({ name: "Home" });
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style lang="less" scoped>
@import "../assets/variables.less";

.form {
  display: grid;
  width: 100%;
  max-width: 780px;
  gap: 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-areas:
    "type type type type"
    "card card name name"
    "expire cvv cpf cpf"
    "checkbox checkbox checkbox checkbox"
    "btn btn btn btn";

  &-type {
    display: flex;
    grid-area: type;
    gap: 90px;

    &-field {
      display: flex;
      gap: 5px;
      align-items: center;
    }
  }

  &-card {
    grid-area: card;
  }
  &-name {
    grid-area: name;
  }
  &-expire {
    grid-area: expire;
  }
  &-cvv {
    grid-area: cvv;
  }
  &-cpf {
    grid-area: cpf;
  }
  &-checkbox {
    grid-area: checkbox;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  &-btn {
    grid-area: btn;
    justify-self: flex-end;
    background-color: @green;
    color: white;
    font-weight: bold;
    letter-spacing: 0.1em;
    padding: 16px;
    border-radius: 6px;
    width: 100%;
    max-width: 380px;
    cursor: pointer;
    margin-bottom: 50px;
  }

  @media (max-width: 540px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "type type"
      "card card"
      "name name"
      "cpf cpf"
      "expire cvv"
      "checkbox checkbox"
      "btn btn";

    &-type {
      justify-content: space-between;
    }

    &-btn {
      max-width: none;
    }
  }

  input {
    background-color: @lightGray;
  }
}
</style>
