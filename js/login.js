'use strict';

(function () {
    var DB_DATA_COLLECTION = 'personal_info'
    var firstname, lastname, uid, dorm, dorm_wing, email, timestamp;
    var survey_id = 'test' + (Date.now() + Math.random()).toString();
    $('#no-record').hide();
    $('#instr').hide();

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

    function check_name() {
        var errmsg = 'Please enter only alphabets';
        $(this)[0].setCustomValidity(/^[a-zA-Z '-]*$/.test($(this).val()) ? '' : errmsg);
    }
    $('#firstname').change(check_name);
    $('#lastname').change(check_name);

    $('#dorm').change(() => {
        var errmsg = 'Please enter your 3-digit room number, starting with 2';
        $('#dorm')[0].setCustomValidity(/^2[0-9][0-9]$/.test($('#dorm').val()) ? '' : errmsg);
    });

    $('#uid').change(() => {
        var errmsg = 'Please enter your 9-digit UID';
        $('#uid')[0].setCustomValidity(/^[0-9]{9}$/.test($('#uid').val()) ? '' : errmsg);
    });

    function submit_info() {
        $('#dorm-wing-group input').removeClass('is-invalid');
        $('#dorm').removeClass('is-invalid');
        dorm = $('#dorm').val();
        dorm_wing = $('input[name="dorm-wing"]:checked').val();

        // check dorm entry
        if (dorm < 201 || (dorm > 238 && dorm < 252) || dorm > 287) {
            // wrong dorm #
            $('#dorm').addClass('is-invalid');
            return;
        } else if ((dorm < 250 && dorm_wing == 'south') || (dorm > 250 && dorm_wing == 'north')) {
            // mismatched dorm and wing
            $('#dorm').addClass('is-invalid');
            $('#dorm-wing-group input').addClass('is-invalid');
            return;
        }

        firstname = $('#firstname').val();
        lastname = $('#lastname').val();
        uid = $('#uid').val();
        email = $('#email').val();

        // ask to double check
        $('#info-check').append('<p>Your first name: <strong>' + firstname + '</strong></p>')
        $('#info-check').append('<p>Your last name: <strong>' + lastname + '</strong></p>')
        $('#info-check').append('<p>Your dorm room: <strong>' + dorm + ' (' + dorm_wing + ')</strong></p>')
        $('#info-check').append('<p>Your UID: <strong>' + uid + '</strong></p>')
        $('#info-check').append('<p>Your email: <strong>' + email + '</strong></p>')
        $('#info-form').hide();
        $('#confirmation').show();
        $('#correct-info').hide();
    }
    window.submit_info = submit_info;

    $('#refresh-btn').click(() => {
        location.reload();
    });

    $('#correct-btn').click(() => {
        $('#correct-info').show();
    });

    $('#cont').click(() => {
        db.collection(DB_DATA_COLLECTION).doc(survey_id).set({
            firstname: firstname,
            lastname: lastname,
            uid: uid,
            email: email,
            dorm: dorm,
            dorm_wing: dorm_wing,
            timestamp: timestamp.toString()
        })
        .then(function() {
            // success
            $('#info-form').hide();
            $('#confirmation').hide();
            $('#correct-info').hide();
            $('#instr').show();
        })
        .catch(function(error) {
            // error
            alert('Failed to access database, please check your internet connection and try again.\n' + error);
            console.log(error);
        });
    });

    $('#start').click(() => {
        window.location.replace('survey.html?survey_id=' + survey_id + '&wing=' + dorm_wing);
    });

    timestamp = new Date();
})();
