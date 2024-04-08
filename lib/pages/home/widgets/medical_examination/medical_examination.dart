import 'package:autoskola/mvvm/view.abs.dart';
import 'package:autoskola/pages/home/widgets/medical_examination/medical_examination_vm.dart';
import 'package:flutter/material.dart' hide View;

class MedicalExamination extends View<MedicalExaminationViewModel> {
  const MedicalExamination(
      {required MedicalExaminationViewModel viewModel, Key? key})
      : super.model(viewModel, key: key);

  @override
  _MedicalExaminationState createState() => _MedicalExaminationState(viewModel);
}

class _MedicalExaminationState
    extends ViewState<MedicalExamination, MedicalExaminationViewModel> {
  _MedicalExaminationState(MedicalExaminationViewModel viewModel)
      : super(viewModel);

  @override
  void initState() {
    super.initState();
    listenToRoutesSpecs(viewModel.routes);
  }

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<MedicalExaminationState>(
      stream: viewModel.state,
      builder: (context, snapshot) {
        if (!snapshot.hasData) return Container();

        final state = snapshot.data!;

        return Center(
          child: Text('Count: ${state.count}'),
        );
      },
    );
  }
}
