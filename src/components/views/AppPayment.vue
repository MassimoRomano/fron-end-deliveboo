<script>
import axios from 'axios';
import dropin from 'braintree-web-drop-in';

export default {
    name: 'AppPayment',
    data() {
        return {
            //Inizializzo una variavile dove poi salverò il token ottunuto dal server
            myToken: '',
            base_api_url: 'http://127.0.0.1:8000/api/',
        };
    },
    methods: {


        giveMeToken() {
            let url = this.base_api_url + "pay/token";
            console.log(url);
            // Aggiungo un ritardo di 1 secondo prima di eseguire la richiesta
            /* setTimeout(() => { */
            axios
                .get(url)
                .then(response => {
                    //Ecco il token!
                    console.log(response.data.clientToken);
                    this.myToken = response.data.clientToken;
                    this.initializeBraintree();
                })
                .catch(error => {
                    console.error('Error getting token:', error);
                });
            /* }, 1000); */
        },

        initializeBraintree() {
            const button = document.querySelector('#submit-button');

            dropin.create({
                authorization: this.myToken,
                container: '#dropin-container'
            }, (createErr, instance) => {
                if (createErr) {
                    console.error('Error creating Braintree Drop-in:', createErr);
                    return;
                }

                button.addEventListener('click', () => {
                    instance.requestPaymentMethod((requestPaymentMethodErr, payload) => {
                        if (requestPaymentMethodErr) {
                            console.error('Error requesting payment method:', requestPaymentMethodErr);
                            return;
                        }
                        console.log(this.base_api_url + 'process-payment', { paymentMethodNonce: payload.nonce });
                        axios.post(this.base_api_url + 'process-payment', { paymentMethodNonce: payload.nonce })
                            .then(response => {
                                const result = response.data;
                                console.log(result);

                                // Tear down the Drop-in UI
                                instance.teardown(teardownErr => {
                                    if (teardownErr) {
                                        console.error('Could not tear down Drop-in UI!');
                                    } else {
                                        console.info('Drop-in UI has been torn down!');
                                        button.remove();
                                    }
                                });
                                console.log(result.success);
                                if (result.success) {
                                    document.querySelector('#checkout-message').innerHTML = `
                    <h1>Success</h1>
                    <p>Your Drop-in UI is working! Check your <a href="https://sandbox.braintreegateway.com/login">sandbox Control Panel</a> for your test transactions.</p>
                    <p>Refresh to try another transaction.</p>
                  `;
                                } else {
                                    console.log(result);
                                    document.querySelector('#checkout-message').innerHTML = `
                    <h1>Error</h1>
                    <p>Check your console.</p>
                  `;
                                }
                            })
                            .catch(error => {
                                console.error('Error processing payment:', error);
                                document.querySelector('#checkout-message').innerHTML = `
                  <h1>Error</h1>
                  <p>Check your console.</p>
                  `;
                            });
                    });
                });
            });
        },
    },
    mounted() {
        //this.initializeBraintree();
        this.giveMeToken();
    }
};
</script>




<template>
    <div class="my_container">
        <div id="dropin-wrapper">
            <div id="checkout-message"></div>
            <div id="dropin-container"></div>
            <button id="submit-button">Submit payment</button>
        </div>
    </div>

</template>




<style scoped>
.my_container {
    width: 50%;
    margin: auto;
}
</style>
