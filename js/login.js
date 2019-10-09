'use strict';

(function () {
    $('#no-record').hide();

    // Firebase configuration
    var firebaseConfig = {
        apiKey: 'AIzaSyBvPWLV2yjapJKblBLcfkVbpZC3cXtM0PU',
        authDomain: 'dorm-network.firebaseapp.com',
        databaseURL: 'https://dorm-network.firebaseio.com',
        projectId: 'dorm-network',
        storageBucket: '',
        messagingSenderId: '804230274072',
        appId: '1:804230274072:web:dd26c12bba4f85e64df76d'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();
    var db_roster_name = 'test_roster';


    function nextpage() {
        // TODO
        alert('next');
    }

    function submit_info() {
        $('#name-group').removeClass('bold has-error has-danger');
        $('#dorm-group').removeClass('bold has-error has-danger');

        var firstname = $('#firstname').val();
        var lastname = $('#lastname').val();

        var sid =  + '-' +  + '-' + $('#dorm').val();

        // TODO error checking
        // TODO prevent user from entering special chars

        sid = sid.toLowerCase();

        // check Firebase
        db.collection(db_roster_name).doc(sid).get().then((db_sid) => {
            if (db_sid.exists) {
                nextpage();
            } else {
                var info = sid.split('-')

                $('#info-check').append('<p>Your first name: <strong>' + firstname + '</strong></p>')
                $('#info-check').append('<p>Your last name: <strong>' + lastname + '</strong></p>')
                $('#info-check').append('<p>Your dorm room: <strong>' + info[2] + '</strong></p>')
                $('#info-check').append('<p>Your UID: <strong>' + info[3] + '</strong></p>')
                $('#info-form').hide();
                $('#no-record').show();
                $('#correct-info').hide();
            }
        }).catch(function(error) {
            alert('Failed to access database, please check your internet connection and try again.');
            console.log(error);
        });
    }
    window.submit_info = submit_info;

    $('#refresh-btn').click(() => {
        location.reload();
    })

    $('#correct-btn').click(() => {
        $('#correct-info').show();
    })

    $('#cont').click(() => {
        nextpage();
    })

})();
