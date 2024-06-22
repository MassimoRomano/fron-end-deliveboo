
<script>
import axios from 'axios';
import dropin from 'braintree-web-drop-in';

export default {
    name: 'AppPayment',
    data() {
        return {};
    },
    methods: {
        initializeBraintree() {
            const button = document.querySelector('#submit-button');

            dropin.create({
                authorization: 'sandbox_9q3q5vsf_k7hty5rbd7vhxpms',
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

                        axios.post('/checkout', { paymentMethodNonce: payload.nonce })
                            .then(response => {
                                const result = response.data;

                                // Tear down the Drop-in UI
                                instance.teardown(teardownErr => {
                                    if (teardownErr) {
                                        console.error('Could not tear down Drop-in UI!');
                                    } else {
                                        console.info('Drop-in UI has been torn down!');
                                        button.remove();
                                    }
                                });

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
        this.initializeBraintree();
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
.my_container{
    width: 50%;
    margin: auto;
}
</style>
