import Demo from '../../../../assets/images/DemoScreenshot.png';
import Info from '../../../../assets/images/DrillInfoScreenshot.png';
import Submit from '../../../../assets/images/SubmitScreenshot.png';
import Feedback from '../../../../assets/images/FeedbackScreenshot.png';
import DrillBank from '../../../../assets/images/DrillBankScreenshot.png';


export const HelpPopupSlidesNames = {
    Demo: 'DEMO',
    Info: 'INFO',
    Submit: 'SUBMIT',
    Feedback: 'FEEDBACK',
    DrillBank: 'DRILL_BANK'
}


export const HelpPopupSlides = [
    {
        name: HelpPopupSlidesNames.Demo,
        image: Demo,
        text: 'Watch the demo of your coach performing each drill'
    },
    {
        name: HelpPopupSlidesNames.Info,
        image: Info,
        text: 'Click on the drill name to see how to set each drill up as well as useful tips'
    },
    {
        name: HelpPopupSlidesNames.Submit,
        image: Submit,
        text: 'Submit a 30 second video of yourself performing each drill'
    },
    {
        name: HelpPopupSlidesNames.Feedback,
        image: Feedback,
        text: 'After you complete each drill your coach will provide feedback within 24 hours!'
    },
    {
        name: HelpPopupSlidesNames.DrillBank,
        image: DrillBank,
        text: 'Each drill you complete will be added to your drill bank'
    }
]