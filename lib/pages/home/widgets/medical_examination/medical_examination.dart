import 'package:autoskola/mvvm/view.abs.dart';
import 'package:autoskola/pages/home/widgets/medical_examination/medical_examination_vm.dart';
import 'package:autoskola/ui_components/MyText.dart';
import 'package:autoskola/ui_components/Sepparator.dart';
import 'package:autoskola/ui_components/appointment_scheduler/appointment_scheduler.dart';
import 'package:autoskola/ui_components/appointment_scheduler/appointment_scheduler_vm.dart';
import 'package:flutter/foundation.dart';
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

        // final state = snapshot.data!;

        return 
          Column(
            children: [
              const MyText(text: "You are required to undergo a medical examination to confirm your fitness for driving. This includes vision, hearing and general fitness testing."),
              const Sepparator(),
              const MyText(text: "You need to schedule an appointment with general practitioner doctor, please select a date and time from the calendar below."),
              const SizedBox(height: 10),
              AppointmentScheduler(viewModel: AppointmentSchedulerViewModel()),
              const SizedBox(height: 10),
              const MyText(text: "After you made your appointment, our driving school will send referral (🖨️) to your occupational medicine (📍) where you will be examined."),
              const SizedBox(height: 10),
              const MyText(text: "You need to pay 20 euros (💵) on site for Examination."),
              const SizedBox(height: 10),
              const MyText(text: "Event is automatically added to your in app calendar (📅)"),
              const Sepparator(),
            ],
        );
      },
    );
  }
}
