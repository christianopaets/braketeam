/*
 * Copyright ©  2018 - 2050 Wenor Holdings Limited.
 *
 * All rights reserved.
 *
 * Email: super@wenortech.com
 *
 * Licensed under the proprietary license.
 *
 * The source code contained herein is, and remains the property of Wenor Holdings Limited.
 *
 * Dissemination, reproduction or other use of this code is strictly forbidden unless prior written permission
 * is obtained from Wenor Holdings Limited.
 *
 * This software is provided by the author “as is” and any express or implied warranties, including,
 * but not limited to, the implied warranties of MERCHANTABILITY and FITNESS FOR A PARTICULAR PURPOSE are disclaimed.
 * In no event shall the author be liable for any direct, indirect, incidental, special, exemplary,
 * or consequential damages (including, but not limited to, procurement of substitute goods or services,
 * loss of use, data, or profits, or business interruption) however caused and on any theory of liability,
 * whether in contract, strict liability, or tort (including negligence or otherwise)
 * arising in any way out of the use of this software, even if advised of the possibility of such damage.
 *
 * You should have received a copy of the Wenor Holdings Limited licence along with this program,
 * if not, write to the super@wenortech.com.
 *
 */

export interface IState<T, K = T> {
  apiData: T;
  data: K;
  loaded: boolean;
  loading: boolean;
}
