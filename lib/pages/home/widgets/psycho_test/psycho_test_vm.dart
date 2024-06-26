


import 'package:autoskola/mvvm/app_routes.dart';
import 'package:autoskola/mvvm/view_model.abs.dart';
import 'package:rxdart/subjects.dart';

class PsychoTestState {
  final int count;
  final bool isMinusEnabled;
  final bool isPlusEnabled;

  PsychoTestState({
    this.isMinusEnabled = false,
    this.isPlusEnabled = true,
    this.count = 0,
  });

  PsychoTestState copyWith({
    bool? isMinusEnabled,
    bool? isPlusEnabled,
    int? count,
  }) {
    return PsychoTestState(
      isMinusEnabled: isMinusEnabled ?? this.isMinusEnabled,
      isPlusEnabled: isPlusEnabled ?? this.isPlusEnabled,
      count: count ?? this.count,
    );
  }
}

class PsychoTestViewModel extends ViewModel {

  final _stateSubject = BehaviorSubject<PsychoTestState>.seeded(PsychoTestState());
  Stream<PsychoTestState> get state => _stateSubject;

  final _routesSubject = PublishSubject<AppRouteSpec>();
  Stream<AppRouteSpec> get routes => _routesSubject;

  void plusButtonTapped() {
    _updateState(_stateSubject.value.count + 1);
  }

  void minusButtonTapped() {
    _updateState(_stateSubject.value.count - 1);
  }

  void secondPageButtonTapped() {
    _routesSubject.add(
      AppRouteSpec(
        name: '/second',
        arguments: {
          'count': _stateSubject.value.count,
        },
      ),
    );
  }

  void _updateState(int newCount) {
    final state = _stateSubject.value;
    _stateSubject.add(
      state.copyWith(
        count: newCount,
        isPlusEnabled: newCount < 5,
        isMinusEnabled: newCount > 0,
      ),
    );
  }

  @override
  void dispose() {
    _stateSubject.close();
    _routesSubject.close();
  }
}
