var app = angular.module('myApp', []);

app.controller('myController', function($scope) {
    $scope.showSetup = true;
    $scope.showGame = false;
    $scope.showResult = false;
    $scope.xuPerPoint = 0;
    $scope.currentGame = 1;
    $scope.currentTurn = 1;
    $scope.selectedChoice = '';

    $scope.startGame = function() {
        $scope.showSetup = false;
        $scope.showGame = true;
    };

    $scope.teamChoices = [];
    $scope.selectChoice = function (choice, teamIndex) {
        $scope.teamChoices[teamIndex] = choice;
    };


    $scope.teams = ['A', 'B', 'C', 'D'];  // Danh sách các đội
    $scope.currentTeamIndex = 0;  // Chỉ số của đội hiện tại

    $scope.nextTeam = function() {
        $scope.currentTeamIndex = ($scope.currentTeamIndex + 1) % $scope.teams.length;

    };

    $scope.prevTeam = function() {
        $scope.currentTeamIndex = ($scope.currentTeamIndex - 1 + $scope.teams.length) % $scope.teams.length;
    };


    








// Thêm biến để kiểm tra xem có nên hiển thị bảng điểm hay không
$scope.showScoreboard = false;

// Hàm kết thúc lượt
$scope.endTurn = function () {
    // Gọi hàm tính tổng điểm
    $scope.calculateScores();
    $scope.calculateScores2();

    // Cập nhật lượt và đội
    if ($scope.currentTurn < 3) {
        // Nếu chưa hết số lượt, chuyển sang lượt tiếp theo
        $scope.currentTurn++;
    } else {
        // Nếu đã hết số lượt, chuyển sang đội tiếp theo
        $scope.currentTurn = 1; // Reset lượt

        $scope.calculateScoresTong();
        $scope.showScoreboard();
        $scope.currentGame++;
        $scope.teamScores = [0, 0, 0, 0];


    }

    // Reset lựa chọn của đội
    $scope.teamChoices = [];
};



// Tạo biến để lưu trữ điểm số
$scope.scores = [];
$scope.scorestong = [];
$scope.tongdiemA = 0;
$scope.tongdiemB = 0;
$scope.tongdiemC = 0;
$scope.tongdiemD = 0;

$scope.calculateScoresTong = function () {
    // Tìm kiếm phần tử trong mảng có điều kiện (ví dụ: team là A)
    var index = $scope.scorestong.findIndex(function (item) {
        return item.team === $scope.teams[0];
    });

    // Nếu tìm thấy, cập nhật giá trị
    if (index !== -1) {
        $scope.scorestong[0].points = $scope.tongdiemA;
        $scope.scorestong[0].xu = $scope.tongdiemA * $scope.xuPerPoint;
        
        $scope.scorestong[1].points = $scope.tongdiemB;
        $scope.scorestong[1].xu = $scope.tongdiemB * $scope.xuPerPoint;

        $scope.scorestong[2].points = $scope.tongdiemC;
        $scope.scorestong[2].xu = $scope.tongdiemC * $scope.xuPerPoint;

        $scope.scorestong[3].points = $scope.tongdiemD;
        $scope.scorestong[3].xu = $scope.tongdiemD * $scope.xuPerPoint;

    } else {
        // Nếu không tìm thấy, thêm mới
        $scope.scorestong.push({
            team: $scope.teams[0],
            points: $scope.tongdiemA,
            xu: $scope.tongdiemA * $scope.xuPerPoint
        });
        // Nếu không tìm thấy, thêm mới
        $scope.scorestong.push({
            team: $scope.teams[1],
            points: $scope.tongdiemB,
            xu: $scope.tongdiemB * $scope.xuPerPoint
        });
        // Nếu không tìm thấy, thêm mới
        $scope.scorestong.push({
            team: $scope.teams[2],
            points: $scope.tongdiemC,
            xu: $scope.tongdiemC * $scope.xuPerPoint
        });
        // Nếu không tìm thấy, thêm mới
        $scope.scorestong.push({
            team: $scope.teams[3],
            points: $scope.tongdiemD,
            xu: $scope.tongdiemD * $scope.xuPerPoint
        });
    }
};




    // Thêm biến để lưu điểm của từng đội
    $scope.teamScores = [0, 0, 0, 0];

    // Thêm hàm tính tổng điểm và cập nhật biến teamScores
    $scope.calculateScores2 = function () {
        var minus9TeamIndex = -1;  // Chỉ số của team bị trừ 9 điểm

        
        for (var i = 0; i < $scope.teamScores.length; i++) {
            // Kiểm tra điều kiện trừ 9 điểm
            if ($scope.teamScores[i] <= -9) {
                minus9TeamIndex = i;
                break;  // Nếu tìm thấy team bị trừ 9 điểm, thoát khỏi vòng lặp
            }
        }
        console.log(minus9TeamIndex);
        console.log($scope.teamScores[3]);
    
        // Xử lý logic trừ và cộng điểm
        if (minus9TeamIndex !== -1) {
            // Nếu có team bị trừ 9 điểm
            for (var j = 0; j < $scope.teamScores.length; j++) {
                if (j === minus9TeamIndex) {
                    // Trừ điểm của team bị trừ 9 điểm thêm 9
                    if(j==0)$scope.tongdiemA-=9;else if(j==1)$scope.tongdiemB-=9;else if(j==2)$scope.tongdiemC-=9;if(j==3)$scope.tongdiemD-=9;
                } else {
                    // Cộng 3 điểm cho các team khác
                    if(j==0)$scope.tongdiemA+=3;else if(j==1)$scope.tongdiemB+=3;else if(j==2)$scope.tongdiemC+=3;if(j==3)$scope.tongdiemD+=3;
                }
            }
        }
    };
    



// Hàm tính tổng điểm và cập nhật vào biến scores
$scope.calculateScores = function () {


    // Lưu trữ điểm số vào biến scores
    $scope.scores.push({
        team: $scope.teams[0],
        game: $scope.currentGame,
        turn: $scope.currentTurn,
        points: $scope.teamChoices[0]
    });
    $scope.tongdiemA += parseInt($scope.teamChoices[0], 10);
    $scope.teamScores[0]+=parseInt($scope.teamChoices[0], 10);


    $scope.scores.push({
        team: $scope.teams[1],
        game: $scope.currentGame,
        turn: $scope.currentTurn,
        points: $scope.teamChoices[1]
    });
    $scope.tongdiemB += parseInt($scope.teamChoices[1], 10);
    $scope.teamScores[1]+=parseInt($scope.teamChoices[1], 10);


    $scope.scores.push({
        team: $scope.teams[2],
        game: $scope.currentGame,
        turn: $scope.currentTurn,
        points: $scope.teamChoices[2]
    });
    $scope.tongdiemC += parseInt($scope.teamChoices[2], 10);
    $scope.teamScores[2]+=parseInt($scope.teamChoices[2], 10);


    $scope.scores.push({
        team: $scope.teams[3],
        game: $scope.currentGame,
        turn: $scope.currentTurn,
        points: $scope.teamChoices[3]
    });
    $scope.tongdiemD += parseInt($scope.teamChoices[3], 10);
    $scope.teamScores[3]+=parseInt($scope.teamChoices[3], 10);


};

// Hàm hiển thị bảng điểm
$scope.showScoreboard = function () {
    $scope.showResult = true;
};

$scope.showScoreboard();





});
